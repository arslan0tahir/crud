/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */



//angular controller for SearchList is Defined Here

var ContainerId="";

var SearchListCompSelector=".SearchListComp";
var SBPosition={};
SearchList=function(){
    var app = angular.module('SearchListApp', []);
    app.controller('SearchCtrl', function($scope) {
        $scope.HoldListColumnIds = ListSettings.CurrentListView.ListViewSettings.ColumnsWithOrder; //hold original ListIds 
        $scope.ListColumnIds = ListSettings.CurrentListView.ListViewSettings.ColumnsWithOrder; //these ids behaves as controlling unit for query display
        $scope.ListColumnDetails = ListSettings.ListColumns;//
        $scope.RenderSearchBoxAdv = TempViewSettings.SearchListComp.Render.SearchBoxAdv;//not used
        $scope.SearchTemplate="CustomCopySearchBox"; //this variabel stores the information of template being copied (SB,ColHeader,Raw)
        $scope.FilterExcludedCol=[];//It cols being excluded from query in SB,ColHeader mode. Whereas its not valid for RawCustomn
        $scope.SyncScope=function(e){
                    $scope.HoldListColumnIds = ListSettings.CurrentListView.ListViewSettings.ColumnsWithOrder;
                    $scope.ListColumnIds = ListSettings.CurrentListView.ListViewSettings.ColumnsWithOrder;
                    $scope.ListColumnDetails = ListSettings.ListColumns;
                    $scope.RenderSearchBoxAdv = TempViewSettings.SearchListComp.Render.SearchBoxAdv;
        }
        $scope.ListenerCustomQueryCheckBox=function(e){
            if (e.target.nodeName=="LABEL"){ //this function is called twice if label is clicked
                return;
            }
            
            //activating custom query i.e mode 3
            if ($(e.target).prop("checked")){
                //disable SearchBox
                //disbale ColumnHeaderSearch
                //update SearchMode
                $(SearchListCompSelector+" .SearchInput").attr("disabled","disabled")
                $(".ColumnHeader .ColumnHeaderSearchBox").attr("disabled","disabled") 
                TempViewSettings.SearchListComp.ActiveSearchMethod=3;
                
                
                
                
                
            }//deactivating custom query i.e mode 2 or 1
            else{
                //enable search box
                $(SearchListCompSelector+" .SearchInput").removeAttr("disabled")
                
                //if search box is not empty, operate in mode 2
                if ( $(SearchListCompSelector+" .SearchInput").val().length){
                    
                    TempViewSettings.SearchListComp.ActiveSearchMethod=2;
                    return;
                }
                else{//operate in mode 1

                    $(".ColumnHeader .ColumnHeaderSearchBox").removeAttr("disabled")
                    TempViewSettings.SearchListComp.ActiveSearchMethod=1;
                }

            }

        }
        $scope.ListenerCustomQueryStarter=function(e){
            $scope.ListColumnIds = ListSettings.CurrentListView.ListViewSettings.ColumnsWithOrder;
            if ($(e.target).hasClass("CustomCopySearchBox")){
                // OR Operated Query will be copied and reflected in Adv Search 
                $scope.FilterExcludedCol=[];//initialize excluded column to []
                $scope.SearchTemplate="CustomCopySearchBox";
                $scope.ActionReflectMainSBQuery(e);
                $scope.ActionComputeAdvSearchQuery(e);
                
            }
            else if ($(e.target).hasClass("CustomCopyColHeader")){
                // AND Operated Query will be copied and reflected in Adv Search
                $scope.FilterExcludedCol=[];
                $scope.SearchTemplate="CustomCopyColHeader";
                $scope.ActionReflectColHdrQuery(e);
                $scope.ActionComputeAdvSearchQuery(e);
                
            }
            else if ($(e.target).hasClass("CustomSearchRaw")){
                // Custom Query can be added here
                $scope.SearchTemplate="CustomSearchRaw";
                $scope.ListColumnIds=[];
                $scope.ListColumnIds[0] = $scope.ListColumnIds[1];
            }
        }
        $scope.ActionComputeAdvSearchQuery=function(){
            var QueryRows=$(".QueryForCols")
            var Query="START "
            for (var i=0; i<QueryRows.length;i++){
                Query=Query+$(".QueryForCols")[i].id.split("QueryForCol")[1]+" ";
                Query=Query+$($(".QueryForCols")[0]).find(".SearchCondition select").val()+" ";
                Query=Query+$($(".QueryForCols")[0]).find(".SearchFor input").val()+" ";
                Query=Query+$($(".QueryForCols")[0]).find(".SearchLogic select").val()+" ";
            }
            Query=Query+"STOP"
            TempViewSettings.SearchListComp.SearchBoxQ.CustomQuery=Query;
            //START 12 Contains 'Hello' 32 AND 24 Contains 'Test'  
            //alert(Query);
        }
        $scope.ActionReflectMainSBQuery=function(e){
            for(i=0;i<$scope.ListColumnIds.length;i++){
                $(SearchListCompSelector+" #QueryForCol"+$scope.ListColumnIds[i]+" .SearchCondition select").val("Contains")
                $(SearchListCompSelector+" #QueryForCol"+$scope.ListColumnIds[i]+" .SearchLogic select").val("OR")
                $(SearchListCompSelector+" #QueryForCol"+$scope.ListColumnIds[i]+" .SearchFor input").val($(SearchListCompSelector+" .SearchInput").val())
            }
        }
        $scope.ActionReflectColHdrQuery=function(e){
            for(i=0;i<$scope.ListColumnIds.length;i++){
                var currColId=$scope.ListColumnIds[i];
                $(SearchListCompSelector+" #QueryForCol"+currColId+" .SearchCondition select").val("Contains")
                $(SearchListCompSelector+" #QueryForCol"+currColId+" .SearchLogic select").val("AND")
                $(SearchListCompSelector+" #QueryForCol"+currColId+" .SearchFor input").val($("th#"+$scope.ListColumnDetails[currColId].ColumnName+"-"+currColId+" ul input.ColumnHeaderSearchBox").val())
            }
        }
        $scope.ActionRawQuery=function(){
            
        }
        $scope.fullName = function(e) {
            alert(RenderSearchBoxAdv);
            return $scope.firstName + " " + $scope.lastName;
        };
        $scope.ActionToggleCurrFilterItem=function(e){
            e.stopPropagation();
            var ToggleRow=parseInt($(e.target).parents("li").attr("id").split("QueryForCol")[1]);
            var Index=$scope.FilterExcludedCol.indexOf(ToggleRow)
            
            if (Index<0){// exclude in query
                $scope.FilterExcludedCol.push(ToggleRow)
            }
            else{//include in query
                $scope.FilterExcludedCol=$scope.FilterExcludedCol.filter(function(item){
                                                                        return item!==ToggleRow
                                                                   })
            }
            
        }
        
        $scope.ActionRemoveCurrFilterItem=function(e){
            e.stopPropagation();
            var RemoveRow=parseInt($(e.target).parents("li").attr("id").split("QueryForCol")[1]);
            $scope.ListColumnIds= $scope.ListColumnIds.filter(function(item) { return item !== RemoveRow})
        }
       
        
        
        $scope.HelperSelectEventCapture=function(e){
            e.stopPropagation();
            $scope.HoldFocusEvent=e;
        }
        $scope.ActionTagParentQueryElement=function(e){
            e=$scope.HoldFocusEvent;
            $(e.target).parents("li").attr("id","QueryForCol"+$(e.target).val());
        }
        
    });
//END Angular##########################################################################################################################

    
    
    
        //load corresponding css
    $('head').append( $('<link rel="stylesheet" type="text/css" />').attr('href', 'Components/SearchList/SearchList.css') );
    
//    alert("SearchList");
    
    //menu is not closed if clicked
    $(SearchListCompSelector).on('click','ul.dropdown-menu',function(e){
        e.stopPropagation();    
    });
    
    //expand search box on click
    $(SearchListCompSelector+" .SearchInput").focus(function()
    {
        $(this).parents(".SearchInputHolder").animate({ width: '+=50'}, 'slow');
    }).blur(function()
    {
        $(this).parents(".SearchInputHolder").animate({ width: '-=50'}, 'slow');
    });
    
    
    
    
    //Mode 2 is activated if Main SearchBox is utilized
    $(SearchListCompSelector+' .SearchInput').on("keyup",function(e){
    
    
        
        TempViewSettings.SearchListComp.SearchBoxQ.SearchString=$(this).val();
        
        
        //Disable ColumnHeader search box if SearchBox query exists
        if ($(this).val().length && $(".ColumnHeader .ColumnHeaderSearchBox").length){
             $(".ColumnHeader .ColumnHeaderSearchBox").attr("disabled","disabled") 
             TempViewSettings.SearchListComp.ActiveSearchMethod=2;
        }
        else{//Enable
            TempViewSettings.SearchListComp.ActiveSearchMethod=1;
            $(".ColumnHeader .ColumnHeaderSearchBox").removeAttr("disabled")
        }
        
        
        //SB changes are also reflected in Custom Query But are not applied until custom query is not enabled---- angular keyup ActionReflectMainSBQuery();
        
    })
    
    
    //make adv searchbox options draggable
    $(SearchListCompSelector+" .draggable").draggable({
                   start:function(){
                       $(this).children(".SBTitleBar").css("display","inline-block");
                       $(this).parents(".SearchListComp").find("button").attr("data-toggle","");
                       
                       //stores initial position of search box
                       if (Object.keys(SBPosition).length === 0){
                           SBPosition=$(this).position();
                       }
                   }
               //containment: "body",
              // scroll: false
       });
    
    
    
    
    //minimize AdvSearchBox
    $(SearchListCompSelector+" .draggable").on('click','li.SBTitleBar span',function(e){
           // alert('minimize');
            io={
                e               : e,
                EventSource     : this,
            }

            $(ContainerId+" .SearchListComp ul").css(SBPosition);//restore to initial position
            $(ContainerId+" .SearchListComp ul .SBTitleBar").css({display:"none"});//hide
            $(ContainerId+" .SearchListComp button.AdvSBMenu").attr("data-toggle","dropdown");//enable toggle effect
            $(ContainerId+" .SearchListComp").trigger("click");//
    })
    
    
    
    
    
    
    
    angular.bootstrap(document.querySelector(".SearchListComp"), ["SearchListApp"])//manual bootstrapping of SearchListComp
};




var checkExist = setInterval(function() {
                        if ($('.SearchListComp').length) {
                            console.log("Exists!");
                            clearInterval(checkExist);
                            SearchList();
                        }                        
                     }, 100);





