/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

(function() {//avoid pollution of gloabl scope
        
        var CompName="Pagination";
        var MyPart="PaginationSummary"
        var AppName=CompName+"App"
        var MyCompSelector="."+CompName+"Comp";
        var MyItem=CompName+"-"+MyPart;
        var MyItemSelector="."+CompName+"-"+MyPart;
        var Beat=function(){
                
            //##################temp
                var app = angular.module(AppName);//e.g. PaginationApp
                app.controller(CompName+"-"+MyPart+"Ctrl", function($scope,PaginationSrv) {
                    Register[CompName][MyPart].scope=$scope;
                    //$scope.TotalItems=$rootScope.Pagination.TotalItems;
                    
                    $scope.TotalItems=21;
                    $scope.test1="I am working";
                    $scope.TotalItemsService=function(){
                        $scope.TotalItems=PaginationSrv.get("TotalItems");
                        return $scope.TotalItems;
                    }
                    
                    $scope.TotalItems = $scope.TotalItemsService();

//                    $scope.$watch("TotalItemsService()", function(newValue, oldValue) {
//                        if (newValue!=oldValue){
//                                $scope.TotalItems = newValue;
//                        }
//                        
//                    });

               })
          
              angular.bootstrap(document.querySelector(MyItemSelector), [AppName])//manual bootstrapping of Parts
        }
        var CHKLoading = setInterval(function() {
                                if ($(MyItemSelector).length) {
                                    console.log("Loaded Successfully........Pagination-PaginationSummary");
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

})();