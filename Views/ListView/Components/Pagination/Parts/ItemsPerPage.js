/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

(function() {//avoid pollution of gloabl scope
        
        var MyComp="Pagination";
        var MyPart="ItemsPerPage"
        var AppName=MyComp+"App"
        var MyCompSelector="."+MyComp+"Comp";
        var MyPartSelector="."+MyComp+"-"+MyPart;
        console.log("s");
        var Beat=function(){
                
                scope = angular.element($(MyCompSelector)).scope();
                scope[MyPart]={};
                scope.$apply(function(){
                        scope[MyPart].initialize=function(){
                                    $(MyPartSelector+' input').val(scope.Pagination.ItemsPerPage);
                                    $(MyPartSelector+' input').on('click', function() {
                                        $(this).val('');
                                      });
                                      $(MyPartSelector+' input').on('mouseleave', function() {
                                        if ($(this).val() == '') {
                                          $(this).val(scope.Pagination.ItemsPerPage);
                                        }

                                      });


                                      $(MyPartSelector+' input').on("change",function(e){
                                          scope[MyPart].ListenerItemsPerPage(e);
                                      })
                        }

                        scope[MyPart].ListenerItemsPerPage=function(e){
                            scope.Pagination.ItemsPerPage=parseInt($(e.target).val()); 
                            scope.ActionPagNavFirstPage();
                            //scope.$apply();
                        }

                })
                scope.TestFuncInside=function(){
                            alert("a");
                }
                scope[MyPart].initialize();
                
            
              //  angular.bootstrap(document.querySelector(MyPartSelector), [AppName])//manual bootstrapping of Parts
        }
        var CHKLoading = setInterval(function() {
                                if (Register[MyComp].Bootstrap) {
                                    console.log("KITE Loaded With All Parts");
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