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

//three type of functions exists]
//
//Listner______________
//Actions______________
//Helpers______________
//
//


(function() {//avoid pollution of gloabl scope
        var ContainerId="";
        var ItemsPerPage="";
        var CompName=""
        var CompPart=[]
        var CompSelector="";
        var AppName="";
        var CtrlName="";
        var Timer=0;
        var DiffTimer=0;


        CompName="Pagination"
        CompSelector="."+CompName+"Comp";
        AppName=CompName+'App';
        CtrlName=CompName+'Ctrl';

        //RegisteringParts
        Register.Tree[CompName]["ItemsPerPage"]={};
        Register.Tree[CompName]["PaginationSummary"]={};

        //Loading Parts of This Component
        
        $.each(Register.Tree[CompName],function(key,val){
            $("[data-crud-comp='"+CompName+"-"+key+"'" ).load( "../../views/ListView/Components/"+CompName+"/Parts/"+key+".html" );
        })
    
//        Register[CompName].forEach(function(part,i){        
//            $("[data-crud-comp='"+CompName+"-"+part+"'" ).load( "../../views/ListView/Components/"+CompName+"/Parts/"+part+".html" );
//          //  $.getScript();
//        })



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


        var Beat=function(){//core of  component


        //load corresponding css
            $('head').append( $('<link rel="stylesheet" type="text/css" />').attr('href', 'Components/'+CompName+'/'+CompName+'.css') );
        
            
            
            
            //START Angular##########################################################################################################################
            var app = angular.module(AppName, []);//e.g. PaginationApp
//            app.service('PaginationSrv', function() {
//                var t=this;
//                this.Pagination = TempViewSettings.Pagination;
//                this.TotalItems = TempViewSettings.Pagination.TotalItems;
//                this.PaginationService = {};
//
//                this.set = function(Prop,Val) {
//                    this.Pagination[Prop]=Val;                 
//                };
//                
//                this.get = function(Prop) {
//                    return this.Pagination[Prop];
//                };
//                setTimeout(function(){
//                    var test=function(){
//                                           t.Pagination.TotalItems=65
//                                            console.log('updated');
//                    }
//                    test();
//                }, 1000,t);
//                //return this.PaginationService;
//            });
            app.controller(CtrlName, function($scope,$timeout) {
                
     //           $scope.Pagination={};
                Register.Tree[CompName].scope=$scope;
                
               
               $scope.Pagination=TempViewSettings.Pagination;
               $scope.SyncPagFromGlobalScope=function(){
                    
                    $scope.Pagination=TempViewSettings.Pagination;//decalre obselete as obects are copied by refrence
                }
                $scope.SyncPagToGlobalScope=function(){
                    TempViewSettings.Pagination=$scope.Pagination;//obselete as obects are copied by refrence
                }
                $scope.initialize1=function(){

                    var hold=[]
                    
                    
                    $scope.HelperCalcPages();
                    //building paginaion window
                    for (i=0;i<$scope.Pagination.PagerLenght;i++){
                        if (i==$scope.Pagination.TotalPages){break;}
                        hold.push(i+1);
                    }
                    $scope.Pagination.PaginationWindow=hold;                   

                }
                
                $scope.HelperCalcPages=function(){
                    $scope.Pagination.TotalPages=Math.ceil($scope.Pagination.TotalItems/$scope.Pagination.ItemsPerPage);

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
                    $scope.ActionGotoPage(parseInt($(e.target).html()))
                    $scope.ActionLoadPage($scope.Pagination.CurrPage);
                    
                    //Register.propagateChanges(CompName,arguments.callee.caller.name)  
                }
                
                
                $scope.ListnerPageNav=function(e){//will listen to click event occur on Pagination Nav Buttons
                    
                    
                    //calculate time difference b/w mouse down and up
                    var ByPass;
                    DiffTimer=new Date() - Timer                    
                    //if greater than 500ms then goto eith first page or last page.
                    if (DiffTimer>500){
                       ByPass=1;
                    }
                    
                    
                    //Navigate Forward of Backward depending upon the key pressed.
                    if($(e.target).parents("li").hasClass("PaginationNavBack")){
                        f=(ByPass==1)? $scope.ActionPagNavFirstPage():$scope.ActionPagNavBack();
                       
                    }
                    else if ($(e.target).parents("li").hasClass("PaginationNavForward")){
                        f=(ByPass==1)?$scope.ActionPagNavLastPage():$scope.ActionPagNavForward();
                    }
                    
                    //Register.propagateChanges(CompName,arguments.callee.caller.name)                 
                }
                
                
                
                
                $scope.ListenerMouseDownTimer=function(){
                    Timer= new Date();
                    
                }
                
//                $scope.ListenerMouseUpTimer=function(){
//                    DiffTimer=new Date() - Timer
//                    
//                    if (DiffTimer>500){
//                        alert("start or stop")
//                    }
//                }
                
                $scope.ActionGotoPage=function(num){
                    $scope.Pagination.CurrPage=num;   
                    
                    Register.propagateChanges([Register.Tree[CompName],0,CompName,CompName],arguments.callee.caller.name);
                }
                
                $scope.ActionPagNavForward=function(e){
                    //if current page is the last page then do nothing.
                    if ($scope.Pagination.CurrPage==$scope.Pagination.TotalPages){
                        return "Forward limit exceeds"; //return and do nothing
                    }
                    
                    
                    //if currnt page is the last page in pagination window; generate new pagination window starting from next page
                    if ($scope.Pagination.CurrPage==($scope.Pagination.PaginationWindow[$scope.Pagination.PagerLenght-1])){
                        $scope.Pagination.PaginationWindow=[];
                         for (i=0;i<$scope.Pagination.PagerLenght;i++){
                             //if page no in window exceeds total pages then break the loop
                             if (($scope.Pagination.CurrPage+i+1)>$scope.Pagination.TotalPages){
                                 break;
                             }
                            $scope.Pagination.PaginationWindow.push($scope.Pagination.CurrPage+i+1);
                         }
                    }
                    
                    $scope.Pagination.CurrPage++;
                    $scope.ActionLoadPage($scope.Pagination.CurrPage);
                    
                    
                    Register.propagateChanges([Register.Tree[CompName],0,CompName,CompName],arguments.callee.caller.name);
                }
                
                
                
                
                $scope.ActionPagNavBack=function(e){
                    //if current page is the first page then do nothing.
                    if ($scope.Pagination.CurrPage==1){
                        return "Backward limit exceeds"; //return and do nothing
                    }
                    
                    
                    //if currnt page is the first page in pagination window; generate new pagination with previous page as last element
                    if ($scope.Pagination.CurrPage==($scope.Pagination.PaginationWindow[0])){
                        $scope.Pagination.PaginationWindow=[];
                        var h=($scope.Pagination.CurrPage-$scope.Pagination.PagerLenght);
                         for (i=0;i<$scope.Pagination.PagerLenght;i++){
//                             
                            $scope.Pagination.PaginationWindow.push(h+i);
                         }
                    }
                    
                    $scope.Pagination.CurrPage--;
                    $scope.ActionLoadPage($scope.Pagination.CurrPage);
                    
                    
                    Register.propagateChanges([Register.Tree[CompName],0,CompName,CompName],arguments.callee.caller.name);
                }
                
                $scope.ActionPagNavFirstPage=function(){
                    var hold=[]
                    
                    //building paginaion window
                    for (i=0;i<$scope.Pagination.PagerLenght;i++){
                        if (i==$scope.Pagination.TotalPages){break;}
                        hold.push(i+1);
                    }
                    $scope.Pagination.PaginationWindow=hold;
                    $scope.Pagination.CurrPage=1;
                    
                    
                    $scope.ActionLoadPage($scope.Pagination.CurrPage)
                    
                    Register.propagateChanges([Register.Tree[CompName],0,CompName,CompName],arguments.callee.caller.name);
                }
                $scope.ActionPagNavLastPage=function(){
                    var hold=[]
                    
                    var limit=$scope.Pagination.TotalPages%$scope.Pagination.PagerLenght;
                    var s=$scope.Pagination.TotalPages-limit;
                    for (i=0;i<limit;i++){
                        hold.push(i+s+1);
                    }
                    $scope.Pagination.PaginationWindow=hold;
                    $scope.Pagination.CurrPage=$scope.Pagination.TotalPages;                   
                    $scope.ActionLoadPage($scope.Pagination.CurrPage)
                    
                    
                    Register.propagateChanges([Register.Tree[CompName],0,CompName,CompName],arguments.callee.caller.name);
                }
                
                $scope.ActionLoadPage=function(PageNo){
                    console.log(PageNo)
                    return 0;
                }
                $scope.TestFuncOutside=function(){
                            alert("a");
                }
                
                
                

                
            });
        //END Angular##########################################################################################################################




                
     



            //manual bootstrapping of PaginationComp and parts
            angular.bootstrap(document.querySelector(CompSelector), [AppName])//manual bootstrapping of PaginationComp
            
            
//            CompPart.forEach(function(part,i){//bootstrapping parts   
//                angular.bootstrap(document.querySelector("[data-crud-comp='"+CompName+"-"+part+"'" ), [AppName])//manual bootstrapping of PaginationComp
//            })

            
            //$.getScript("../../views/ListView/Components/"+CompName+"/Parts/ItemsPerPage.js",function(){});

    
        };




        var CHKLoading = setInterval(function() {
                                if (CompAndPartsLoaded()) {
                                    console.log("Loaded Successfully........"+CompName);
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