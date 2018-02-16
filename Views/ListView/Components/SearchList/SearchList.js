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



SearchList=function(){
    var app = angular.module('SearchListApp', []);
    app.controller('SearchCtrl', function($scope) {
        $scope.ListColumns = ListSettings.CurrentListView.ListViewSettings.ColumnsWithOrder;
        $scope.lastName = "Doe";
        $scope.fullName = function() {
            return $scope.firstName + " " + $scope.lastName;
        };
    });


    
    
    
        //load corresponding css
    $('head').append( $('<link rel="stylesheet" type="text/css" />').attr('href', 'Components/SearchList/SearchList.css') );
    
    alert("SearchList");
    
    //menu is not closed if clicked
    $(".SearchListComp ").on('click','ul.dropdown-menu',function(e){
        e.stopPropagation();    
    });
    
    //expand search box on click
    $('.SearchListComp .SearchInput').focus(function()
    {
        $(this).parents(".SearchInputHolder").animate({ width: '+=50'}, 'slow');
    }).blur(function()
    {
        $(this).parents(".SearchInputHolder").animate({ width: '-=50'}, 'slow');
    });
    
    $(".SearchListComp .draggable").draggable({
                   start:function(){
//                       $(this).children(".DDTitleBar").css("display","inline-block");
//                       $(this).parents("th.ColumnHeader").find("button").attr("data-toggle","");
//                       io={
//                           e               : '',
//                           EventSource     : this
//                       };
//                       Output=ActionIdentifyCell(io);
//                       if (!DDPosition.hasOwnProperty(Output.ColumnId)){
//                           DDPosition[Output.ColumnId]=$(this).position();
//                       }
                       //DDPosition[Output];
                   }
               //containment: "body",
              // scroll: false
       });
    
    
     angular.bootstrap(document.querySelector(".SearchListComp"), ["SearchListApp"])//manual bootstrapping of SearchListComp
};




var checkExist = setInterval(function() {
                        if ($('.SearchListComp').length) {
                            console.log("Exists!");
                            clearInterval(checkExist);
                            SearchList();
                        }                        
                     }, 100);





