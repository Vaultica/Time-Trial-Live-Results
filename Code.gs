var SPLITS_SHEET_NAME = "Form Responses 1";
var START_SHEET_NAME = "Startsheet";
var RESULTS_SHEET_NAME = "Results";
var RANKINGS_SHEET_NAME = "Rankings";
var RIDER_NAME_COL_IDX = 2;
var RANKING_RIDER_NAME_COL_IDX = 2;
var RANKING_RIDER_TIME_COL_IDX = 3;

var MATCH_POINTS_COL_IDX = 2;

function updateResults() {
  var splitsRange = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(SPLITS_SHEET_NAME).getDataRange();
  var splitsValues = splitsRange.getValues();
  
  var startsheetRange = SpreadsheetApp.getActiveSpreadsheet().getRangeByName('Startsheet!Sheet');
  var resultsRange = SpreadsheetApp.getActiveSpreadsheet().getRangeByName('Results!Results');
  var resultsRange2 = SpreadsheetApp.getActiveSpreadsheet().getRangeByName('Results!Results2');
  var resultsRange3 = SpreadsheetApp.getActiveSpreadsheet().getRangeByName('Results!Results3');
  var startsheetValues = startsheetRange.getValues();
  var resultsValues = resultsRange.getValues();
  var resultsValues2 = resultsRange2.getValues();
  var resultsValues3 = resultsRange3.getValues();
  
//  var rankingRange = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(RANKINGS_SHEET_NAME).getDataRange();
//  var rankingValues = rankingRange.getValues();

  var riders = {};

  for (var i = 1; i < splitsValues.length; i++) { // Collect split times
    var splitRow = splitsValues[i];
    var riderTime = Date();  // time is recorded in 3rd column
    riderTime = splitRow[2];
  
    var riderTimeFormat = Utilities.formatDate(riderTime, "GMT", "mm:ss");
    var riderNo = splitRow[1];  // No is recorded in 2nd column
    //var riderStd = startsheetValues[riderNo][6];
    
    // Assign time to RiderNo in the startsheet dataset 
    startsheetValues[riderNo][4] = riderTime;
    
    // Assign time to RiderNo in the appropriate result dataset (column) 
    if ( riderNo <= 30 ) { 
           Logger.log('Entered 0-30 range ' + riderNo);
           resultsValues[riderNo][4] = riderTimeFormat;
    }
    else if ( riderNo >= 31 && riderNo <=60 ) {  // && riderNo - 1 <= resultsValues2.length + 30
           Logger.log('Entered 31-60 range ' + riderNo);
           resultsValues2[riderNo - 30][4] = riderTimeFormat;
    }
    else if ( riderNo >= 61 && riderNo <=90 ) {
           Logger.log('Entered 61-90 range ' + riderNo);
           resultsValues3[riderNo - 60][4] = riderTimeFormat;
    }
    
   } // end for loop here  

    // Finally, write the updated value arrays back to the sheet
    //resultsRange.sort(4);
    startsheetRange.setValues(startsheetValues);

    if ( riderNo <= 30 ) { 
       resultsRange.setValues(resultsValues);
    }
    else if ( riderNo >= 31 && riderNo <=60 ) {
       resultsRange2.setValues(resultsValues2);
    }
    else if ( riderNo >= 61 && riderNo <=90 ) {
       resultsRange3.setValues(resultsValues3);
    }
  //} // for loop
}

function updatePosition() {

}

function clearResults() {
  var startsheetRange = SpreadsheetApp.getActiveSpreadsheet().getRangeByName('Startsheet!Sheet');
  var resultsRange = SpreadsheetApp.getActiveSpreadsheet().getRangeByName('Results!Results');
  var resultsRange2 = SpreadsheetApp.getActiveSpreadsheet().getRangeByName('Results!Results2');
  var resultsRange3 = SpreadsheetApp.getActiveSpreadsheet().getRangeByName('Results!Results3');
  var startsheetValues = startsheetRange.getValues();
  var resultsValues = resultsRange.getValues();
  var resultsValues2 = resultsRange2.getValues();
  var resultsValues3 = resultsRange3.getValues();
  
  for (var i = 1; i < 80 ; i++) {
    startsheetValues[i][4] = []
    
    if ( i <= 30 ) { 
           resultsValues[i][4] = [];
    }
    else if ( i >= 31 && i <=60 ) { 
           resultsValues2[i - 30][4] = [];
    }
    else if ( i >= 61 && i <=90 ) {
           resultsValues3[i - 60][4] = [];
    }

  }    
    
  startsheetRange.setValues(startsheetValues);
  resultsRange.setValues(resultsValues);
  resultsRange2.setValues(resultsValues2);
  resultsRange3.setValues(resultsValues3);

}

/*
function setRowColors() {
  var splitsRange = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(SPLITS_SHEET_NAME).getDataRange();
  var splitsValues = splitsRange.getValues();
  var resultsRange = SpreadsheetApp.getActiveSpreadsheet().getRangeByName('Results!Results');
  var resultsRange2 = SpreadsheetApp.getActiveSpreadsheet().getRangeByName('Results!Results2');
  var resultsRange3 = SpreadsheetApp.getActiveSpreadsheet().getRangeByName('Results!Results3');
  var resultsValues = resultsRange.getValues();
  var resultsValues2 = resultsRange2.getValues();
  var resultsValues3 = resultsRange3.getValues();

  for (var i = splitsValues.getRow(); i < splitsValues.getLastRow(); i++) {
//    rowRange = range.offset(i, 0, 1);
//    status = splitRange.offset(0, statusColumnOffset).getValue();
    
    if (status == 'Completed') {
      rowRange.setBackgroundColor("#99CC99");
    } else if (status == 'In Progress') {
      rowRange.setBackgroundColor("#FFDD88");    
    } else if (status == 'Not Started') {
      rowRange.setBackgroundColor("#CC6666");          
    }
  }
}
*/

function onOpen() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  ss.addMenu("Results Service",
             [{ name: "Update Results", functionName: "updateResults" },
              { name: "Clear Results", functionName: "clearResults" }]);
}

function onEdit(e) {
  // Update the results when a new time is received
  updateResults();
}
