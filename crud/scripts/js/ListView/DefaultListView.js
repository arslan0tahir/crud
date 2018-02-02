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




//All server routine starts with List
//All view routines will start with Table
var TemplateModel={};
var DDPosition={};
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
var InitializeTempViewSettings=function(){}; //it will initialize json object TempViewSettings
var InitializeFilterQuery=function(){};      //it will initialize json object TempViewSettings.Query


var ListFetchData=function(io){};
var ListIsDataReady=function(io){};
var ListPopulateTable=function(io){};


var ListnerHeaderCells=function(io){};
var ListnerHeaderIcons=function(io){};
var ListnerHeaderCellsDropDown=function(io){};

    var ActionIdentifyCell=function(io){};
    var ActionUpdateQueryFromIcon=function(io){}; //this routine will update TempViewSettings
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
    ListnerHeaderCells(); //Attach listners to specific elements
    ListnerBody();
    
    
    
    
    
    
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
                "SortOrder": "",
                "QueryText": ""
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
                
                DropDownHtml=$("#ListHeaderDropDownTemplate").html();
                regex=/var_.*_rav/g;
                DropDownHtml=DropDownHtml.replace(regex,CurrColumnName);
                HeaderCellObject.append(DropDownHtml);

                HeaderCellObject.append("");
                $(TableHeaderSelector).append(HeaderCellObject); 

            }
            
            
            //Prevent Bootstrap dropdown from closing on clicks
//            $('table thead .dropdown-menu').click(function(e) {
//                    e.stopPropagation();
//            });

    
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
    
    ActionSyncViewWithQuery(); //initial synchronization of view with query
}

ListnerHeaderCells=function(io){
    
    ListnerHeaderCellsIcons(io);
    ListnerHeaderCellsDropDown(io)
    
    
}

ListnerHeaderCellsIcons=function(io){
    
    $("table.ListDataTable").on('click','a.FilterIcon',function(e){
        
        io={
            e               : e,
            EventSource     : this
        }
        
        var SourceCell
                
                
        SourceCell=ActionIdentifyCell(io);
        ActionUpdateQueryFromIcon(SourceCell);
        ActionSyncViewWithQuery(SourceCell);        
    })
}

ListnerHeaderCellsDropDown=function(io){
        
        $("table.ListDataTable thead").on('click','ul',function(e){
                e.stopPropagation();
        })
        
        
        $("table.ListDataTable thead").on('click','ul li',function(e){
                //e.stopPropagation();
                 if (e.target.tagName=='LABEL'){
                     return;//if mouse is clicked on label, click event is invoked twice
                            //this condition will ingore extra click event
                   }

                //alert(e.target.tagName);


               io={
                   e               : e,
                   EventSource     : this,
                   SourceCell      : {}

               }

               var SourceCell;


               SourceCell=ActionIdentifyCell(io);
               io.SourceCell=SourceCell;
               ActionUpdateQueryFromDropDown(io);
               ActionSyncViewWithQuery(SourceCell);        
        })
    
        $(".draggable").draggable({
                   start:function(){
                       $(this).children(".DDTitleBar").css("display","inline-block");
                       $(this).parents("th.ColumnHeader").find("button").attr("data-toggle","");
                       io={
                           e               : '',
                           EventSource     : this
                       };
                       Output=ActionIdentifyCell(io);
                       if (!DDPosition.hasOwnProperty(Output.ColumnId)){
                           DDPosition[Output.ColumnId]=$(this).position();
                       }
                       //DDPosition[Output];
                   }
               //containment: "body",
              // scroll: false
       });
    
    
        $("table.ListDataTable thead").on('keyup','ul li input',function(e){
            io={
                e               : e,
                EventSource     : this,
                SourceCell      : {}

            }

            var SourceCell;


            SourceCell=ActionIdentifyCell(io);
            io.SourceCell=SourceCell;
            ActionUpdateQueryFromDropDown(io);
            ActionSyncViewWithQuery(SourceCell);  
            //alert("key up");

        })
        $("table.ListDataTable thead th.ColumnHeader").on('click','li.DDTitleBar',function(e){
           // alert('minimize');
            io={
                e               : e,
                EventSource     : this,
                SourceCell      : {}
            }
            ActionResetCurrDropdownDraggable(io);
//
//            var SourceCell;
//
//
//            SourceCell=ActionIdentifyCell(io);
//            io.SourceCell=SourceCell;
//            ActionUpdateQueryFromDropDown(io);
//            ActionSyncViewWithQuery(SourceCell);  
//            //alert("key up");

        })

    
    
  
}

ListnerBody=function(io){
    //$("body").on("click",ActionResetAllDropdownDraggable);
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

ActionUpdateQueryFromIcon=function(io){
    
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

ActionUpdateQueryFromDropDown=function(io){
    
    if (io.e.target.tagName=='INPUT' && $(io.e.target).parents("li.NO-FilterTxtBox").length==1){
            // var s=io.SourceCell.ColumnId;
             TempViewSettings.Query[io.SourceCell.ColumnId].QueryText=$(io.e.target).val();
             return;//
    }
    else {
    
        var hold=io.EventSource.className;
        var MyColumnIds=ListSettings.CurrentListView.ListViewSettings.ColumnsWithOrder;
       
        //clear all other sort queries
        for (i=0;i<MyColumnIds.length;i++){

            if (MyColumnIds[i]==io.SourceCell.ColumnId){
                Checked=$(io.EventSource).find('input').prop('checked');
                if (hold=="No-FilterChkBox"){
                    if(Checked){
                        TempViewSettings.Query[io.SourceCell.ColumnId].SortOrder="";
                    }

                }
                else if (hold=="AO-FilterChkBox"){
                    if(Checked){
                        TempViewSettings.Query[io.SourceCell.ColumnId].SortOrder="Ascending";
                    }
                    else{
                        TempViewSettings.Query[io.SourceCell.ColumnId].SortOrder="";
                    }

                }
                else if (hold=="DO-FilterChkBox"){
                    if(Checked){
                        TempViewSettings.Query[io.SourceCell.ColumnId].SortOrder="Descending";
                    }
                    else{
                        TempViewSettings.Query[io.SourceCell.ColumnId].SortOrder="";
                    }
                }
            }
            else{
                TempViewSettings.Query[MyColumnIds[i]].SortOrder="";
            }


        }
    }

    test=function(){}
    
    
    

}
ActionSyncViewWithQuery=function(io){
    
    ActionSyncViewWithQuery_Icons(io);
    ActionSyncViewWithQuery_Dropdown(io);
    
    

}

ActionSyncViewWithQuery_Icons=function(io){
        var hold="";
    var HeaderCellId=""
    var MyColumnIds=ListSettings.CurrentListView.ListViewSettings.ColumnsWithOrder;
    
    for (i=0;i<MyColumnIds.length;i++){
       
        ColId=ListSettings.ListColumns[MyColumnIds[i]].ColumnId;
        ColName=ListSettings.ListColumns[MyColumnIds[i]].ColumnName;
        HeaderCellId=ColName+"-"+ColId;
        
        hold=TempViewSettings.Query[MyColumnIds[i]].SortOrder;
        IconSpan="#"+HeaderCellId+" a.FilterIcon span";
        
        AOFilterChkBox="#"+HeaderCellId+" ul li.AO-FilterChkBox input";
        DOFilterChkBox="#"+HeaderCellId+" ul li.DO-FilterChkBox input";
        NoFilterChkBox="#"+HeaderCellId+" ul li.No-FilterChkBox input";
        
        
        if(hold==""){
           $(IconSpan).addClass("glyphicon-sort");
           $(IconSpan).removeClass("glyphicon-sort-by-attributes-alt");
           $(IconSpan).removeClass("glyphicon-sort-by-attributes");
           
           $(NoFilterChkBox).prop('checked', true);
           
        }
        else if (hold=="Ascending"){
           $(IconSpan).removeClass("glyphicon-sort");
           $(IconSpan).removeClass("glyphicon-sort-by-attributes-alt");
           $(IconSpan).addClass("glyphicon-sort-by-attributes");
           
           $(AOFilterChkBox).prop('checked', true); 
        }
        else if (hold=="Descending"){
           $(IconSpan).removeClass("glyphicon-sort");
           $(IconSpan).addClass("glyphicon-sort-by-attributes-alt");
           $(IconSpan).removeClass("glyphicon-sort-by-attributes");
           
           $(DOFilterChkBox).prop('checked', true); 
        }
       
       
    }
};


ActionSyncViewWithQuery_Dropdown=function(io){
    var hold="";
    var HeaderCellId=""
    var MyColumnIds=ListSettings.CurrentListView.ListViewSettings.ColumnsWithOrder;
    
    for (i=0;i<MyColumnIds.length;i++){
       
        ColId=ListSettings.ListColumns[MyColumnIds[i]].ColumnId;
        ColName=ListSettings.ListColumns[MyColumnIds[i]].ColumnName;
        HeaderCellId=ColName+"-"+ColId;
        
        hold=TempViewSettings.Query[MyColumnIds[i]].SortOrder;
        
        AOFilterChkBox="#"+HeaderCellId+" ul li.AO-FilterChkBox input";
        DOFilterChkBox="#"+HeaderCellId+" ul li.DO-FilterChkBox input";
        NoFilterChkBox="#"+HeaderCellId+" ul li.No-FilterChkBox input";
        
        
        if(hold==""){
           
           $(NoFilterChkBox).prop('checked', true);
           $(DOFilterChkBox).prop('checked', false);
           $(AOFilterChkBox).prop('checked', false);
           
        }
        else if (hold=="Ascending"){
          
           
           $(NoFilterChkBox).prop('checked', false); 
           $(DOFilterChkBox).prop('checked', false);
           $(AOFilterChkBox).prop('checked', true);
        }
        else if (hold=="Descending"){
           
           
           $(NoFilterChkBox).prop('checked', false); 
           $(DOFilterChkBox).prop('checked', true);
           $(AOFilterChkBox).prop('checked', false);
        }
       
       
    }
}

ActionResetAllDropdownDraggable=function(io){
    for (var prop in DDPosition){
        Selector="#"+ListSettings.ListColumns[prop].ColumnName+"-"+prop
        $(Selector+" ul .DDTitleBar").css({display:"none"});
        $(Selector+" ul").css(DDPosition[prop]);
    }
    
}

ActionResetCurrDropdownDraggable=function(io){
        SourceCell=ActionIdentifyCell(io);
        $("#"+SourceCell.CellId+" ul").css(DDPosition[SourceCell.ColumnId]);
        $("#"+SourceCell.CellId+" ul .DDTitleBar").css({display:"none"});
        $("#"+SourceCell.CellId+" button.HeaderDropDown").attr("data-toggle","dropdown");
        $("#"+SourceCell.CellId).trigger("click");
}