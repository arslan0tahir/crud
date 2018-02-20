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
        $scope.ListColumnIds = ListSettings.CurrentListView.ListViewSettings.ColumnsWithOrder;
        $scope.ListColumnDetails = ListSettings.ListColumns;
        $scope.RenderSearchBoxAdv = TempViewSettings.SearchListComp.Render.SearchBoxAdv;
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
            if ($(e.target).hasClass("CustomSearchMain")){
                
            }
            else if ($(e.target).hasClass("CustomSearchColHeader")){
                
            }
            else if ($(e.target).hasClass("CustomSearchRaw")){
                
            }
        }
        $scope.ActionBuildCustomQuery=function(){
            
        }
        $scope.ActionSyncViewWithMainSBQuery=function(){
            
        }
        $scope.ActionSyncViewWithColHdrQuery=function(){
            
        }
        $scope.ActionSyncViewWithRawQuery=function(){
            
        }
        $scope.fullName = function(e) {
            alert(RenderSearchBoxAdv);
            return $scope.firstName + " " + $scope.lastName;
        };
    });


    
    
    
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





