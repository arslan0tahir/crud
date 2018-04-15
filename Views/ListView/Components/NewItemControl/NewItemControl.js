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

TempViewSettings.NewItemControl={
        Render:{
            
        },
        ModalWindow             : 1,    //if form is rendered in modal window              
        FormColumnsWithOrder    : {
            Personel: [12,13,16],
            Class   : [21,19]
        },         
        //
        //its an object e.g.(Fieldset Name and 
        //  {
        //      Persoanl: [12,13,16],  //these ids can be native or foreign
        //      Class   : [21,19],
        //      Subject : [55,56]
        //              //      }
        //  }
        //  
        //  
        //  [12,13,16,21,19]
        //**these all ColIds must be a subset of ColumnsWithOrder otherwise data of that feild will not
        //be saved
        //
        
        
    
};


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


        CompName="NewItemControl"
        CompSelector="."+CompName+"Comp";
        AppName=CompName+'App';
        CtrlName=CompName+'Ctrl';

        //RegisteringParts
//        Register.Tree[CompName]["ItemsPerPage"]={};
//        Register.Tree[CompName]["PaginationSummary"]={};

        //Loading Parts of This Component        
        $.each(Register.Tree[CompName],function(key,val){
            $("[data-crud-comp='"+CompName+"-"+key+"'" ).load( "../../views/ListView/Components/"+CompName+"/Parts/"+key+".html" );
        });

        var Beat=function(){//core of  component


        //load corresponding css
            $('head').append( $('<link rel="stylesheet" type="text/css" />').attr('href', 'Components/'+CompName+'/'+CompName+'.css') );
        
            
            
            
            //START Angular##########################################################################################################################
            var app = angular.module(AppName, []);//e.g. PaginationApp
         
            app.controller(CtrlName, function($scope,$timeout) {
                
            // $scope.Pagination={};
                       Register.Tree[CompName].scope=$scope;

                       $scope.initialize=function(){
                           // alert("NewItemControl")
                           
//                           dialog = $("#AddListItemDialog").dialog({
//                                        autoOpen: false
//                                    });
                                    
                                    
                              
                                    
                       }
                       $scope.HelperGetCsrfTocken=function(){
                           
                       }
                       $scope.HelperAppendCsrfTocken=function(){
                           
                       }
                       
                       $scope.HelperFormElementHtml=function(Elem){
                            //
                            //{
                            //    ColId     :
                            //    ColName   :
                            //    HtmlForDataType  :   {   
                            //                      Input: {
                            //                                type          : 
                            //                                max           : 2,
                            //                                min           : 3,
                            //                                autocomplete  : "",
                            //                                ChildNode     :   {
                            //                                //if any e.g for select we have options
                            //                                }
                            //                      }                      
                            //                      
                            //    
                            //                  }
                            //}
                            //
                            //
                            //
                            //
                            //*********************Types of elements
                            //input.text
                            //input.password
                            //input.submit
                            //input.reset
                            //input.radio
                            //input.checkbox
                            //input.button
                            //######HTML5[
                            //input.color
                            //input.date
                            //input.datetime-local
                            //input.email
                            //input.month
                            //input.number
                            //input.range
                            //input.search
                            //input.tel
                            //input.time
                            //input.url
                            //input.week
                            //]HTML5#######
                            //select    option,optgroup
                            //selectMultiple
                            //textarea
                            //button
                            //#######HTML5[
                            //list datalist
                            //output
                            //]HTML5#######
                            //
                            //
                            //
                            //*********************Attributes
                            //disabled	          
                            //max
                            //maxlength
                            //maxlength
                            //min	
                            //pattern	
                            //readonly
                            //required
                            //size	
                            //step	
                            //value
                            //#######HTML5[
                            //autocomplete
                            //autofocus
                            //form
                            //formaction
                            //formenctype
                            //formmethod
                            //formnovalidate
                            //formtarget
                            //height and width
                            //list
                            //min and max
                            //multiple
                            //pattern (regexp)
                            //placeholder
                            //required
                            //step
                            //]#######HTML5
                            //
                            //
                       } 
                       
                       $scope.ListnerSubmitButton=function(){
                           
                       }                       
                       $scope.ListnerAddItem=function(){
//                             dialog.dialog("open")
//                           dialog = $("#AddListItemDialog").dialog({
//                               autoOpen: false
//                           });
                       }
                       
                       
                       $scope.ActionSubmitForm=function(){
                           
                       }
                       $scope.ActionAppendItem=function(){
                           
                       }
      
                
            });
        //END Angular##########################################################################################################################




                
     



            //manual bootstrapping of PaginationComp and parts
            angular.bootstrap(document.querySelector(CompSelector), [AppName])//manual bootstrapping of PaginationComp
 
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

        };


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
        };


})();