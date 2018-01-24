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
                                RenderSr            : 1,
                                ColumnsWithOrder    : [12,13,16,21,19], //these are permitted columns for users/goup
                                GroupSortEnable     : 0,
                                GroupSortColumns    : [],
                                GroupSortOrder      : [], //Ascending/Descending
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
                         /*TempViewSettings is initially populated with common feilds of currentListview/ListViewSettings
                          * --TempViewSettings is populated on runtime and data is refetched from the server in acoordance with 
                          * the custom filter settings. 
                          * --TempViewSettings will temporarily override some of the ListViewSettings
                          *   
                          *
                          *contained in this object.
                          */ 
                            RenderSr            : 1,
                            ColumnsWithOrder    : "RISTRICTED",
                            RowOrderBy          : "DEFAULT",
                            SearchQ             : "",  
                            CurrPage            : 1,
                            TotalPages          : 1,  //calculated on run time
                            ItemsPerPage        : 20, //or Default
                            TotalItems          : 2,   //total items of query
                            GroupSortEnable     : 0,
                            GroupSortColumns    : [],
                            GroupSortOrder      : "Ascending", //Ascending/Descending
                            Filter             :{
                                                             
                                                    13          :{
                                                                    "SortOrder": "Ascending" ,//Ascending/Descending
                                                                 },
                                                    
                                                    16          :{
                                                            
                                                                 }
                                
                                                }      

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
var ListnerColumnFilter=function(){};





//**************************************************************MAIN START
$(document).ready(function() {
 //   $("table.ListDataTable thead tr").append("<td>hello<td>");
    ListPopulateTable();
    ListnerColumnFilter();
});
//**************************************************************MAIN END




ListFetchData= function(){
    
}

ListCheckData=function(){
    
}
ListPopulateTable= function(){
   
   
    //vars for population of header
    var MyColumnIds=ListSettings.CurrentListView.ListViewSettings.ColumnsWithOrder;
    var RenderSr=TempViewSettings.RenderSr;
    MyColumns=ListSettings.ListColumns;
    var ColTemplate="<th style='padding: 0px;position:relative'></th>";
    var TableHeaderSelector="table.ListDataTable thead tr"
    var HeaderCellObject=""; //holds rendered DOM of cell
    var CurrColumnName="";
     //vars for population of body
    var TableBodySelector="table.ListDataTable tbody"; 
    var RowHeadTemplate="<th scope='row' ></th>";
    var RowTemplate="<tr id=''></tr>";   
    var RowCellTemplate="<td id=''></td>";
    var RowHeaderTemplate="<th scope='row'>1</th>";
    var CurrRowHTML="";
    var CurrRowData="";
    var RowHeader=ListSettings.CurrentListView.ListViewSettings.RowHeader;
    var StartSerialNo=1;
    var SerialNo=0;
    var EndSerialNo=1;
    var CurrPage=TempViewSettings.CurrPage;
    var ItemsPerPage=TempViewSettings.ItemsPerPage;
    var TotalItems=TempViewSettings.TotalItems;
    
    
    
    
    //populate Table Header
            //Rendering first column title as either Sr. or Id
            if(RenderSr){
                  HeaderCellObject=$(ColTemplate).html("<div class='dropdown' style='display: inline-block; width:  100%;'>\n\
                                                            <button class='btn btn-default dropdown-toggle HeaderDropDown' type='button' id='dropdownMenu1' data-toggle='dropdown' aria-haspopup='true' aria-expanded='false' style='font-weight:bolder   ; border: 0px;    margin:  2px;'>\n\
                                                            Sr\n\
                                                            </button>\n\
                                                        </div>"); 
            }
            else{
                        
            }
            $(TableHeaderSelector).append(HeaderCellObject); 


            //Rendering rest of column titles
            for (var i=0;i<MyColumnIds.length;i++){
                CurrColumnName=MyColumns[MyColumnIds[i]].ColumnName
                HeaderCellObject=$(ColTemplate).html("");
                HeaderCellObject.attr("class","ColumnHeader")
                HeaderCellObject.attr("id",CurrColumnName+"-"+MyColumnIds[i])
                HeaderCellObject.append("<div class='dropdown' style='position:relative;display: inline-block; width:  100%;white-space: nowrap;'>\n\
                                            <div style='display:inline-block;padding-right:25px'>\n\
                                            <button class='btn btn-default dropdown-toggle HeaderDropDown' type='button' id='dropdownMenu1' data-toggle='dropdown' aria-haspopup='true' aria-expanded='false' style='font-weight:bolder   ; border: 0px;    margin:  2px; '>\n\
                                                "+CurrColumnName+"\n\
                                                <span class='caret'></span>\n\
                                            </button>\n\
                                            <ul class='dropdown-menu' aria-labelledby='dropdownMenu1'>\n\
                                                <li><input id='checkBox' type='checkbox'><a href='#'>Sort Ascending</a></li>\n\
                                                <li><a href='#'>Sort Decending</a></li>\n\
                                                <li><a href='#'>Clear Filters</a></li>\n\
                                                <li role='separator' class='divider'></li>\n\
                                                <li><a href='#'>Separated link</a></li>\n\
                                            </ul>\n\
                                            </div>\n\
                                            \n\
                                            <div style='padding:8px;position:absolute;right:0px; top:50%; transform: translateY(-50%);;display:inline-block;text-align:right'><a class='FilterIcon' href='#' style='' title='Sort Ascending or Descending'><span style='font-size: small;' class='glyphicon glyphicon-sort '></a></span>\n\
                                            </a></div>\n\
                                            </div>");
                HeaderCellObject.append("");
                $(TableHeaderSelector).append(HeaderCellObject); 

            }
            
    
    //populate Table Body
            //populating row header
            StartSerialNo=(CurrPage-1)*ItemsPerPage+1;
            SerialNo=StartSerialNo;
            EndSerialNo=0; //dynamic calculation
            
            
            for (i=0;i<ItemsPerPage;i++){//populating row
                if (SerialNo>TotalItems){
                    break;
                }
                CurrRowData=ListData.ListData[i];
                RowId=CurrRowData["Id"];
                CurrRowHTML=$(RowTemplate).attr("id","Row-"+RowId);
                CurrRowHTML.attr("data-sr",SerialNo);
                
                
        
                if(RenderSr){
                    ColName="Sr";
                    ColId=0;
                    CurrColHtml=$(RowHeadTemplate);
                    CurrColHtml.attr("data-col-name",ColName);
                    CurrColHtml.attr("data-col-id",ColId);
                    CurrColHtml.attr("id","Cell-"+RowId+"-"+ColId);
                    CurrColHtml.html(SerialNo);
                    CurrRowHTML.append(CurrColHtml);                   
                }
                //rendring rest of rows
                for(j=0;j<MyColumnIds.length;j++){//populating row cells
                    MyColumnIds[j]
                    ColName=MyColumns[MyColumnIds[j]].ColumnName;
                    ColId=MyColumns[MyColumnIds[j]].ColumnId;
                    CurrColHtml=(j==0 && RenderSr==0? $(RowHeadTemplate):$(RowCellTemplate));
                    CurrColHtml.attr("data-col-name",ColName);
                    CurrColHtml.attr("data-col-id",ColId);
                    CurrColHtml.attr("id","Cell-"+RowId+"-"+ColId);
                    CurrColHtml.html(CurrRowData[ColName]);
                    
                    CurrRowHTML.append(CurrColHtml);
                }
                MyColumns ;
                MyColumnIds;
                $(TableBodySelector).append(CurrRowHTML);
                
                
                SerialNo++;
            }
            
            
            
                /*
                 *  <tr>
                  <th scope="row">1</th>
                  <td>Mark</td>
                  <td>Otto</td>
                  <td>@mdo</td>
                    </tr>
                */
    
    
}

ListnerColumnFilter=function(){
    
    $("table.ListDataTable").on('click','a.FilterIcon',function(e){
        
        var a=$(this).children("span");
        
        if (a.hasClass( "glyphicon-sort" )){
            a.removeClass( "glyphicon-sort" )
            a.addClass( "glyphicon-sort-by-attributes" )
        }
        else{
            a.toggleClass("glyphicon-sort-by-attributes glyphicon-sort-by-attributes-alt")
        }
        
//        else if(a.hasClass( "glyphicon-sort-by-attributes" )){
//            a.removeClass( "glyphicon-sort-by-attributes" )
//            a.addClass( "glyphicon-sort-by-attributes-alt" )
//        }
//        else if(a.hasClass( "glyphicon-sort-by-attributes" )){
//            a.removeClass( "glyphicon-sort-by-attributes" )
//            a.addClass( "glyphicon-sort-by-attributes-alt" )
//        }
        
        
        //alert(this.id);
    })
}




