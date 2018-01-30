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
                                DataSource          : [], //AJAX  (AJAX Data source in this mode is SQL Tables. LISTDATA/ListColumns in accordance with queires)
                                                          //LOCAL (LOCAL Data source in this mode is LISTDATA array no queries are sent to the server)  
                                
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
                          * --TempViewSettings will send as ajax queries to the server 
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
                            Query               :{}
//                                                              {
//                                                             
//                                                                  13          :{
//                                                                                     "SortOrder": "Ascending" //Ascending/Descending
//                                                                                },
//                                                              }      

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
var Initialize=function(){};
var InitializeTempViewSettings=function(){};
var InitializeFilterQuery=function(){};


var ListFetchData=function(io){};
var ListIsDataReady=function(io){};
var ListPopulateTable=function(io){};


var ListnerHeaderCells=function(io){};
    var ActionIdentifyCell=function(io){};
    var ActionUpdateQuery=function(io){}; //this routine will update TempViewSettings
    var ActionSyncViewWithQuery=function(io){};
    var ActionSendAJAXQuery=function(io){};   //this routine will send TempViewSettings to server
    var ActionUpdateListData=function(io){};
    var ActionUpdateListColumns=function(io){};




var ListnerRowCells=function(io){};
var ListnerPagination=function(io){};





//**************************************************************MAIN START
$(document).ready(function() {
 //   $("table.ListDataTable thead tr").append("<td>hello<td>");
    Initialize();
    ListPopulateTable();
    ListnerHeaderCells();
});
//**************************************************************MAIN END


Initialize= function(io){
    InitializeTempViewSettings();
    
}



InitializeTempViewSettings= function(io){
    
    
    InitializeFilterQuery();
}

InitializeFilterQuery= function(io){
    
    
    var MyColumnIds=ListSettings.CurrentListView.ListViewSettings.ColumnsWithOrder;
    
    for (i=0;i<MyColumnIds.length;i++){
            TempViewSettings.Query[MyColumnIds[i]]={
                "SortOrder": ""
            };
    }

}

ListFetchData= function(io){
    
}

ListCheckData=function(io){
    
}
ListPopulateTable= function(io){
   
   
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
                                            <button class='btn btn-default dropdown-toggle HeaderDropDown' type='button' id='dropdownMenu1' data-toggle='dropdown' aria-haspopup='true' aria-expanded='false' style='font-weight:bolder   ; border: 0px;    margin:  2px; '>"+CurrColumnName+"  \n\
<span class='caret'></span>\n\
</button>\n\
                                            <ul class='dropdown-menu' aria-labelledby='dropdownMenu1' style='padding:8px'>\n\
                                                <li style='padding:0px' class='AO-Filter'>\n\
                                                     <a style='padding:2px'><div class='checkbox'     style='margin: 0px; display:inline-block'>\n\
                                                        <label><input type='checkbox' value='' name='SortOrder'>Ascending</label>\n\
                                                     </div>\n\
                                                     <span style='font-size: small;float:right' class='glyphicon glyphicon-sort-by-attributes'></span>\n\
                                                    </a>\n\
                                                </li>\n\
                                                <li style='padding:0px' class='DO-Filter'>\n\
                                                    <a style='padding:2px'><div class='checkbox'     style='margin: 0px; display:inline-block'>\n\
                                                        <label><input type='checkbox' value='' name='SortOrder'>Descending</label>\n\
                                                     </div>\n\
                                                     <span style='font-size: small;float:right' class='glyphicon glyphicon-sort-by-attributes-alt'></span>\n\
                                                    </a>\n\
                                                </li>\n\
                                                \n\
                                                <li role='separator' class='divider'></li>\n\
                                                <li style='padding:0px' class='No=Filter'>\n\
                                                     <a style='padding:2px'><div class='checkbox'     style='margin: 0px; display:inline-block'>\n\
                                                        <label><input type='checkbox' value='' name='SortOrder'>No Filter</label>\n\
                                                     </div>\n\
                                                     <span style='font-size: small;float:right' class='glyphicon glyphicon glyphicon-sort'></span>\n\
                                                    </a>\n\
                                                </li>\n\
                                            </ul>\n\
                                            </div>\n\
                                            \n\
                                            <div style='padding:8px;position:absolute;right:0px; top:50%; transform: translateY(-50%);;display:inline-block;text-align:right'><a class='FilterIcon' href='#' style='' title='Sort Ascending or Descending'><span style='font-size: small;' class='glyphicon glyphicon-sort '></a></span>\n\
                                            </a></div>\n\
                                            </div>");
                HeaderCellObject.append("");
                $(TableHeaderSelector).append(HeaderCellObject); 

            }
            
            
            //Prevent Bootstrap dropdown from closing on clicks
            $('.dropdown-menu').click(function(e) {
                    e.stopPropagation();
            });

    
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

ListnerHeaderCells=function(io){
    
    $("table.ListDataTable").on('click','a.FilterIcon',function(e){
        
        io={
            e               : e,
            EventSource     : this
        }
        
        var SourceCell
                
                
        SourceCell=ActionIdentifyCell(io);
        ActionUpdateQuery(SourceCell);
        ActionSyncViewWithQuery(SourceCell);        
        
        
//        var a=$(this).children("span");
//        
//        if (a.hasClass( "glyphicon-sort" )){
//            a.removeClass( "glyphicon-sort" )
//            a.addClass( "glyphicon-sort-by-attributes" )
//        }
//        else{
//            a.toggleClass("glyphicon-sort-by-attributes glyphicon-sort-by-attributes-alt")
//        }
      
        
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

ActionIdentifyCell=function(io){
//   Input Object
//    
//   io{
//          e     :e      RowCell/HeaderCell
//          source:this
//   }


    
    
    var oo={};
    oo.Response={};
    var EventSource=io.EventSource;
    
    if ($(EventSource).parents("thead").length){
        oo.Type="HeaderCell";
        oo.RowId="";
        oo.CellId=$(EventSource).parents("th").attr("id");
        oo.ColumnId=oo.CellId.split("-")[1];
        
    }
    else if ($(EventSource).parents("tbody").length){
        oo.type="RowCell";
        
        
    }
        
    
    
    
    
//   Return Object
//    
//   oo{
//          Type           RowCell/HeaderCell
//          ColumnId
//          RowId
//          CellId
//   }
    return oo;
}

ActionUpdateQuery=function(io){
    
    var hold=TempViewSettings.Query[io.ColumnId].SortOrder;
    
    
    var MyColumnIds=ListSettings.CurrentListView.ListViewSettings.ColumnsWithOrder;
    
    
    //clear all other sort queries
    for (i=0;i<MyColumnIds.length;i++){
            
        if (MyColumnIds[i]==io.ColumnId){
            if (hold==""){
                TempViewSettings.Query[io.ColumnId].SortOrder="Ascending"
            }
            else if (hold=="Ascending"){
                TempViewSettings.Query[io.ColumnId].SortOrder="Descending"
            }
            else if (hold=="Descending"){
                TempViewSettings.Query[io.ColumnId].SortOrder="Ascending"
            }
        }
        else{
            TempViewSettings.Query[MyColumnIds[i]].SortOrder="";
        }
        
        
    }



    
    
    

}


ActionSyncViewWithQuery=function(io){
    var hold="";
    var HeaderCellId=""
    var MyColumnIds=ListSettings.CurrentListView.ListViewSettings.ColumnsWithOrder;
    
    for (i=0;i<MyColumnIds.length;i++){
       
        ColId=ListSettings.ListColumns[MyColumnIds[i]].ColumnId;
        ColName=ListSettings.ListColumns[MyColumnIds[i]].ColumnName;
        HeaderCellId=ColName+"-"+ColId;
        
        hold=TempViewSettings.Query[MyColumnIds[i]].SortOrder;
        IconSpan="#"+HeaderCellId+" a.FilterIcon span";
        
        AOFilterChkBox="#"+HeaderCellId+" ul li.AO-Filter input";
        DOFilterChkBox="#"+HeaderCellId+" ul li.DO-Filter input";
        NoFilterChkBox="#"+HeaderCellId+" ul li.No-Filter input";
        
        
        if(hold==""){
           $(IconSpan).addClass("glyphicon-sort");
           $(IconSpan).removeClass("glyphicon-sort-by-attributes-alt");
           $(IconSpan).removeClass("glyphicon-sort-by-attributes");
           
           $(NoFilterChkBox).attr('checked', true);
           
        }
        else if (hold=="Ascending"){
           $(IconSpan).removeClass("glyphicon-sort");
           $(IconSpan).removeClass("glyphicon-sort-by-attributes-alt");
           $(IconSpan).addClass("glyphicon-sort-by-attributes");
           
           $(AOFilterChkBox).attr('checked', true); 
        }
        else if (hold=="Descending"){
           $(IconSpan).removeClass("glyphicon-sort");
           $(IconSpan).addClass("glyphicon-sort-by-attributes-alt");
           $(IconSpan).removeClass("glyphicon-sort-by-attributes");
           
           $(DOFilterChkBox).attr('checked', true); 
        }
       
       
    }
}


