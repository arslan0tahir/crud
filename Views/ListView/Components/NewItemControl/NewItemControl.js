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
        })

        var Beat=function(){//core of  component


        //load corresponding css
            $('head').append( $('<link rel="stylesheet" type="text/css" />').attr('href', 'Components/'+CompName+'/'+CompName+'.css') );
        
            
            
            
            //START Angular##########################################################################################################################
            var app = angular.module(AppName, []);//e.g. PaginationApp
         
            app.controller(CtrlName, function($scope,$timeout) {
                
            // $scope.Pagination={};
                       Register.Tree[CompName].scope=$scope;

                       $scope.initialize=function(){
                            alert("NewItemControl")
                       }
                       $scope.HelperGetCsrfTocken=function(){
                           
                       }
                       $scope.HelperAppendCsrfTocken=function(){
                           
                       }                       
                       
                       $scope.ListnerSubmitButton=function(){
                           
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