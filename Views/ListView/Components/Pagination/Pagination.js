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




(function() {//avoid pollution of gloabl scope
        var ContainerId="";
        var ItemsPerPage="";
        var CompName=""
        var CompPart=[]
        var CompSelector="";
        var AppName="";
        var CtrlName="";

        CompName="Pagination"
        CompSelector="."+CompName+"Comp";
        AppName=CompName+'App';
        CtrlName=CompName+'Ctrl';
        //Component parts to be loaded
        CompPart[0]="ItemsPerPage"; //e.g. Pagination-ItemsPerPage
        CompPart[1]="PaginationSummary";



        //Loading Parts of This Component
        CompPart.forEach(function(part,i){        
            $("[data-crud-comp='"+CompName+"-"+part+"'" ).load( "../../views/ListView/Components/"+CompName+"/Parts/"+part+".html" );
        })




//Pagination          :{
//                                    
//                                    Render:{
//                                        DisplayModule   :   1,
//                                        Summary         :   1,
//                                        ItemPerPage     :   1
//                                    },                                    
//                                    CurrPage            :   1,
//                                    TotalPages          :   1,  //calculated on run time
//                                    ItemsPerPage        :   20, //or Default
//                                    PagerLenght         :   5,  //if 5 then <Previos  1-5 Next>
//                                    TotalItems          :   20,    //total items of query
//                                    PaginationWindow    :  []
//                            }


        Beat=function(){//core of  component


        //load corresponding css
            $('head').append( $('<link rel="stylesheet" type="text/css" />').attr('href', 'Components/'+CompName+'/'+CompName+'.css') );
        
            
            
            
            //START Angular##########################################################################################################################
            var app = angular.module(AppName, []);//e.g. PaginationApp
            app.controller(CtrlName, function($scope) {
                $scope.test="I AM IN";
                $scope.SyncPagFromGlobalScope=function(){
                    $scope.Pagination=TempViewSettings.Pagination;
                }
                $scope.SyncPagToGlobalScope=function(){
                    TempViewSettings.Pagination=$scope.Pagination;
                }
                $scope.initialize1=function(){
                    $scope.SyncPagFromGlobalScope();
                    var hold=[]
                    
                    //building paginaion window
                    for (i=0;i<$scope.Pagination.PagerLenght;i++){
                        hold.push(i+1);
                    }
                    $scope.Pagination.PaginationWindow=hold;
                
                    //START&&&&&&&&&&&&&&& [this placement of script is temporay] initialize items perpage
                    $('.PaginationItemsPerPageContainer input').val(TempViewSettings.Pagination.ItemsPerPage);
                    $('.PaginationItemsPerPageContainer input').on('click', function() {
                        $(this).val('');
                      });
                      $('.PaginationItemsPerPage input').on('mouseleave', function() {
                        if ($(this).val() == '') {
                          $(this).val(TempViewSettings.Pagination.ItemsPerPage);
                        }
                      });
                    //END&&&&&&&&&&&&&&&
                }
                
                
                $scope.ClassPageItem=function(x){
                    if (x==$scope.Pagination.CurrPage){
                        return "page-item active";
                    }
                    else{
                        return "page-item";
                    }
                }
                
                
                $scope.ListnerPageNo=function(e){//will listen to click event occur within pagination window
                    $scope.Pagination.CurrPage=parseInt($(e.target).html());
                    $scope.ActionLoadPage($scope.Pagination.CurrPage);
                }
                
                
                $scope.ListnerPageNav=function(e){//will listen to click event occur on Pagination Nav Buttons
                    if($(e.target).parents("li").hasClass("PaginationNavBack")){
                        $scope.ActionPagNavBack();
                    }
                    else if ($(e.target).parents("li").hasClass("PaginationNavForward")){
                        $scope.ActionPagNavForward();
                    }
                }
                
                
                $scope.ActionPagNavForward=function(){
                    if ($scope.Pagination.CurrPage==$scope.Pagination.TotalPages){
                        return "Forward limit exceeds"; //return and do nothing
                    }
                    
                    if ($scope.Pagination.CurrPage==($scope.Pagination.PaginationWindow[$scope.Pagination.PagerLenght-1])){
                        $scope.Pagination.PaginationWindow=[];
                         for (i=0;i<$scope.Pagination.PagerLenght;i++){
                             if (($scope.Pagination.CurrPage+i+1)>$scope.Pagination.TotalPages){
                                 break;
                             }
                            $scope.Pagination.PaginationWindow.push($scope.Pagination.CurrPage+i+1);
                         }
                    }
                    
                    $scope.Pagination.CurrPage++;
                    $scope.ActionLoadPage($scope.Pagination.CurrPage);
                }
                
                
                
                
                $scope.ActionPagNavBack=function(){
                    if ($scope.Pagination.CurrPage==1){
                        return "Backward limit exceeds"; //return and do nothing
                    }
                    
                    
                    //if Pagination window limit exceeds
                    if ($scope.Pagination.CurrPage==($scope.Pagination.PaginationWindow[0])){
                        $scope.Pagination.PaginationWindow=[];
                         for (i=($scope.Pagination.CurrPage-$scope.Pagination.PagerLenght);i<=$scope.Pagination.PagerLenght;i++){
//                             if (($scope.Pagination.CurrPage+i)>$scope.Pagination.TotalPages){
//                                 break;
//                             }
                            $scope.Pagination.PaginationWindow.push(i);
                         }
                    }
                    
                    $scope.Pagination.CurrPage--;
                    $scope.ActionLoadPage($scope.Pagination.CurrPage);
                    
                }
                
                
                
                $scope.ActionLoadPage=function(PageNo){
                    console.log(PageNo)
                    return 0;
                }
            });
        //END Angular##########################################################################################################################




                
     



            //manual bootstrapping of PaginationComp and parts
            angular.bootstrap(document.querySelector(CompSelector), [AppName])//manual bootstrapping of PaginationComp
            CompPart.forEach(function(part,i){//bootstrapping parts   
                angular.bootstrap(document.querySelector("[data-crud-comp='"+CompName+"-"+part+"'" ), [AppName])//manual bootstrapping of PaginationComp
            })

        };




        var CHKLoading = setInterval(function() {
                                if (CompAndPartsLoaded()) {
                                    console.log(CompName+" Loaded With All Parts");
                                    clearInterval(CHKLoading);
                                    Beat();
                                }                        
                             }, 100);


        EvaluateBoundry=function(con,comment){
            //if con true error exists
            if(con){
                console.trace();
                console.log("CRUD Warning: "+comment);
                //console.trace();
                return true;
            }
            return false;

        }


        //check if all part of a component are loaded
        CompAndPartsLoaded=function(){
            var ReturnVal=1;
            if ($(CompSelector).length){
                CompPart.forEach(function(part,i){ 
                        if($("[data-crud-comp='"+CompName+"-"+part+"'" ).length){

                        }
                        else{
                            ReturnVal=0;
                        }
                })
                return ReturnVal
            }
            else{
                ReturnVal=0;
                return ReturnVal;
            }
        }


})();