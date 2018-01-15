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
var ListSettings={

                    ListName: "Students",
                    CurrentListView: {

                            ListViewName: "Default",
                            ListViewSettings:{
                                RenderIdAsSr        : "0",
                                ColumnsWithOrder    : [12,13,19,21,16], //these are permitted columns for users/goup
                                RowOrderBy          : [13,16],
                                ItemsPerPage        : 20,
                                ShowTotalRows       : "1",
                                RowHeader           : [12]
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

                }


var TempViewSettings=   {   
                         /*--TempViewSettings is populated on runtime and data is refetched from the server in acoordance with 
                          * the custom filter settings. 
                          * --TempViewSettings will temporarily override some of the ListViewSettings
                          *   
                          *
                          *contained in this object.
                          */ 
                            RenderIdAsSr        : "DEFAULT",
                            ColumnsWithOrder    : "RISTRICTED",
                            RowOrderBy          : "DEFAULT",
                            ItemsPerPage        : "DEFAULT",
                            SearchQ             : ""   

                        }



var ListData= {
                ListData:   [
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





//MyURL="http://something/CRUD/m/List/index.php?lid=12" path form mobiles
MyURL="http://something/CRUD/d/List/index.php?lid=12"    //path for destop
alert("success");


//functions
var ListFetchData=function(){};
var ListIsDataReady=function(){};
var ListPopulateTable=function(){};


$(document).ready(function() {
 //   $("table.ListDataTable thead tr").append("<td>hello<td>");
    ListPopulateTable();
});





ListFetchData= function(){
    
}

ListCheckData=function(){
    
}
ListPopulateTable= function(){
   
   
    //vars for for population of header
    var MyColumnIds=ListSettings.CurrentListView.ListViewSettings.ColumnsWithOrder;
    var RenderIdAsSr=ListSettings.CurrentListView.ListViewSettings.RenderIdAsSr;
    MyColumns=ListSettings.ListColumns;
    var ColTemplate="<th></th>";
    var TableHeaderSelector="table.ListDataTable thead tr"
    var HeaderCellObject=""; //holds rendered DOM of cell
    var CurrColumnName=""
     //vars for for population of body
    var TableBodySelector="table.ListDataTable tbody"; 
    var RowHeadTemplate="<th scope='row'></th>";
    var RowTemplate="<tr id=''></tr>";   
    var RowCellTemplate="<td ></td>";
    var RowHeader=ListSettings.CurrentListView.ListViewSettings.RowHeader;
    
    
    
    
    
    
    //populate Table Header
            //Rendering first column title as either Sr. or Id
            if(RenderIdAsSr){
                       //if true Id will automatically be rendered in upcomming loop                 
            }
            else{
                        HeaderCellObject=$(ColTemplate).html("Sr."); 
            }
            $(TableHeaderSelector).append(HeaderCellObject); 


            //Rendering rest of column titles
            for (var i=0;i<MyColumnIds.length;i++){
                CurrColumnName=MyColumns[MyColumnIds[i]].ColumnName
                HeaderCellObject=$(ColTemplate).html(CurrColumnName);
                $(TableHeaderSelector).append(HeaderCellObject); 

            }
            
    
    //populate Table Body
            //populating row header
            
            
            
                /*
                 *  <tr>
                  <th scope="row">1</th>
                  <td>Mark</td>
                  <td>Otto</td>
                  <td>@mdo</td>
                    </tr>
                */
    
    
}






