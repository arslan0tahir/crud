/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

(function() {//avoid pollution of gloabl scope
        
        var CompName="Pagination";
        var MyPart="ItemsPerPage"
        var AppName=CompName+"App"
        var MyCompSelector="."+CompName+"Comp";
        var MyItem=CompName+"-"+MyPart;
        var MyItemSelector="."+CompName+"-"+MyPart;
    
        var Beat=function(){
                
            //##################temp
                var app = angular.module(AppName);//e.g. PaginationApp
                app.controller(CompName+"-"+MyPart+"Ctrl", function($scope) {
                    
                    Register.Tree[CompName][MyPart].scope=$scope;
                    
                    $scope.Pagination=TempViewSettings.Pagination;
                    $scope.initialize=function(){
                                    $(MyItemSelector+' input').val($scope.Pagination.ItemsPerPage);
                                    $(MyItemSelector+' input').on('click', function() {
                                        $(this).val('');
                                      });
                                      $(MyItemSelector+' input').on('mouseleave', function() {
                                        if ($(this).val() == '') {
                                          $(this).val($scope.Pagination.ItemsPerPage);
                                        }

                                      });
                    }
                    $scope.ListenerItemsPerPage=function(){
                            Register.csc("Pagination","ActionPagNavFirstPage")
                            $scope.ActionItemsPerPage();
                            
                    }
                    //$scope.$watch("Pagination",function(v){alert("a");})
                    $scope.ActionItemsPerPage=function(){
                            
                            Register.propagateChanges([Register.Tree[CompName],0,MyPart,CompName],arguments.callee.caller.name);
                    }
                    
                })
          
              angular.bootstrap(document.querySelector(MyItemSelector), [AppName])//manual bootstrapping of Parts
        }
        var CHKLoading = setInterval(function() {
                                if ($(MyItemSelector).length) {
                                    console.log("Loaded Successfully........"+MyItem);
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