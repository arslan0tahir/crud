/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


var MyComp="Pagination";
var MyPart="ItemsPerPage"

var MyCompSelector="."+MyComp+"Comp";
var MyPartSelector="."+MyComp+"-"+MyPart;


console.log("s");
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
            scope.$apply();
        }

    



})
scope[MyPart].initialize();

