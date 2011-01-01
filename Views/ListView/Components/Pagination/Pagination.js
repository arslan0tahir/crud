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


//access scope from JS
//angular.element($(".SearchListComp")).scope().ListColumnIds 
var ContainerId="";
var ItemsPerPage="Pagination-ItemsPerPage";
var PaginationCompSelector=".PaginationComp";

Pagination=function(){
    //Loading Parts of Pagination Component
        $("[data-crud-comp="+ItemsPerPage+"]" ).load( "../../views/ListView/Components/Pagination/Parts/ItemsPerPage.html" );
        $("[data-crud-comp="+ItemsPerPage+"]" ).load( "../../views/ListView/Components/Pagination/Parts/ItemsPerPage.html" );

    
    
 //START Angular##########################################################################################################################
    var app = angular.module('PaginationApp', []);
    app.controller('PaginationCtrl', function($scope) {
    });
//END Angular##########################################################################################################################

    
    
    
        //load corresponding css
    $('head').append( $('<link rel="stylesheet" type="text/css" />').attr('href', 'Components/Pagination/Pagination.css') );
    
//    alert("SearchList");
    


    

 
    
    
    
    angular.bootstrap(document.querySelector(".PaginationComp"), ["PaginationApp"])//manual bootstrapping of PaginationComp
};




var CHKPagination = setInterval(function() {
                        if ($('.PaginationComp').length) {
                            console.log("Pagination Loaded!");
                            clearInterval(CHKPagination);
                            Pagination();
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
//Object.prototype.get = function(prop) {
//    this[prop] = this[prop] || {};
//    return this[prop];
//};
//
//Object.prototype.set = function(prop, value) {
//    this[prop] = value;
//}


