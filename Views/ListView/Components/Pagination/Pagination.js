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




(function() {//avoid pollution of gloabl scope
        var ContainerId="";
        var ItemsPerPage="";
        var CompName=""
        var CompPart=[]
        var CompSelector="";
        var AppName="";
        var CtrlName="";

        CompName="Pagination"
        CompSelector="."+CompName+"Comp";
        AppName=CompName+'App';
        CtrlName=CompName+'Ctrl';
        //Component parts to be loaded
        CompPart[0]="ItemsPerPage"; //e.g. Pagination-ItemsPerPage
        CompPart[1]="PaginationSummary";



        //Loading Parts of This Component
        CompPart.forEach(function(part,i){        
            $("[data-crud-comp='"+CompName+"-"+part+"'" ).load( "../../views/ListView/Components/"+CompName+"/Parts/"+part+".html" );
        })







        Beat=function(){//core of pagination component


        //load corresponding css
            $('head').append( $('<link rel="stylesheet" type="text/css" />').attr('href', 'Components/'+CompName+'/'+CompName+'.css') );
        //START Angular##########################################################################################################################
            var app = angular.module(AppName, []);//e.g. PaginationApp
            app.controller(CtrlName, function($scope) {
                $scope.test="I AM IN"
            });
        //END Angular##########################################################################################################################




                
     



            //manual bootstrapping of PaginationComp and parts
            angular.bootstrap(document.querySelector(CompSelector), [AppName])//manual bootstrapping of PaginationComp
            CompPart.forEach(function(part,i){//bootstrapping parts   
                angular.bootstrap(document.querySelector("[data-crud-comp='"+CompName+"-"+part+"'" ), [AppName])//manual bootstrapping of PaginationComp
            })

        };




        var CHKLoading = setInterval(function() {
                                if (CompAndPartsLoaded()) {
                                    console.log(CompName+" Loaded With All Parts");
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