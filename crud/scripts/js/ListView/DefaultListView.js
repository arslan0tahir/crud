/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */





/*
 * PROPERTIES
 * 
 * list.Name
 * list.ColumnOrder
 * list.RowOrder
 * list.Id
 * list.Settings
 * 
 * 
 * 
 * 
 * 
 * 
 * METHODS
 * 
 * list.fetchData()
 * list.fetchList()
 * list.fetchListData()
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * Setting Ideas
 * RowGroups and Column Groups in A ListView
 *  
 *   
 *     
 */
DataList={

    ListName: "Students",
    TempViewSettings: {   
            
            RenderIdAsSr        : "DEFAULT",
            ColumnsWithOrder    : "RISTRICTED",
            RowOrderBy          : "DEFAULT",
            ItemsPerPage        : "DEFAULT",
            SearchQ             : ""   
        
    }, 
    CurrentListView: {
            
            ListViewName: "Default",
            ListViewSettings:{
                RenderIdAsSr        : "FALSE",
                ColumnsWithOrder    : [12,13,19,21,16],
                RowOrderBy          : [13,16],
                ItemsPerPage        : 20,
                ShowTotalRows       : "TRUE"
            }
    },
    ListColumns: {
                12:{   
                    ColumnId: 12,
                    ColumnName: "Id",
                },
                13:{   
                    ColumnId: 13,
                    ColumnName: "FirstName",
                },
                16:{   
                    ColumnId: 16,
                    ColumnName: "LastName",
                },
                19:{   
                    ColumnId: 19,
                    ColumnName: "Age",
                },
                21:{   
                    ColumnId: 21,
                    ColumnName: "Class",
                }
            },
    ListData: [
            {   
                    Id: 12,
                    FirstName: "Arslan",
                    LastName: "Tahir",
                    Age: "29",
                    Class: "10"
            },
            {   
                    Id: 13,
                    FirstName: "Ghulam",
                    LastName: "Mustafa",
                    Age: "31",
                    Class: "10"
            }
        
    ]
}








MyURL="http://something/CRUD/List/index.php?lid=12"
alert("success");

$(document).ready(function() {
    $("table.ListDataTable thead tr").append("<td>hello<td>");
});
