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
SearchList=function(){
    $('head').append( $('<link rel="stylesheet" type="text/css" />').attr('href', 'Components/SearchList/SearchList.css') );
    
    alert("SearchList");
    
    
    $(".SearchListComp ").on('click','ul.dropdown-menu',function(e){
        e.stopPropagation();    
    })
    
    
    $('.SearchInput').focus(function()
    {
        $(this).parents(".SearchInputHolder").animate({ width: '+=50'}, 'slow');
    }).blur(function()
    {
        $(this).parents(".SearchInputHolder").animate({ width: '-=50'}, 'slow');
    });
};

SearchList();
