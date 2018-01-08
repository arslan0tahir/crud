/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */





/*
 * PROPERTIES
 * 
 * list.Name
 * list.ColumnOrder
 * list.RowOrder
 * list.Id
 * list.Settings
 * 
 * 
 * 
 * 
 * 
 * 
 * METHODS
 * 
 * list.fetchData()
 * list.fetchList()
 * list.fetchListData()
 
 */
data={
    listName: "Students", 
    settings: [{
            ColumnOrder : [],
            RowOrderBy:[13,16],
            View: "Default"
            
    }],
    columns: [
            {   
                ColumnId: 12,
                ColumnName: "Id",
            },
            {   
                ColumnId: 13,
                ColumnName: "FirstName",
            },
            {   
                ColumnId: 16,
                ColumnName: "LastName",
            },
            {   
                ColumnId: 19,
                ColumnName: "Age",
            },
            {   
                ColumnId: 21,
                ColumnName: "Class",
            }
       ],
    data: [
        
    ]
}

alert("success")
