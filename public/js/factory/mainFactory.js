/**
 * Created by annu1 on 8/27/2017.
 */
app.factory("mainFactory",function ($http,$q) {
    var editName="";
    var editDesc="";
    var obj = {
       "setter":function (name,desc) {
           var data = {"name":name,
               "desc":desc};
           $http.post('/backendDataTransfer',data).success(function(done){
               console.log("data sent to backend");
           }).error(function(er){
               console.log("Error is ",er);
           });
       },
        "getter":function () {
            //console.log("getter called from factory");
            var defered = $q.defer();
            $http.get('/gotData').success(function(data){
                console.log("got data from backend");
                defered.resolve(data);
                //scope.offers=data;
            }) .error(function(er){
                console.log("Error is ",er);
                //scope.offers = er;
                defered.reject(er);
            });
            return defered.promise;
        },
        "editor":function (editName,editDesc,editId) {
            var data = {
                "id":editId,
                "name":editName,
                "desc":editDesc
            };
            // console.log('editor data----->>>',data);
            $http.post('/updateData',data).success(function(done){
                console.log("editing data sent to backend");
            }).error(function(er){
                console.log("Error in editor is ",er);
            });
        },
        "deleter":function (name,desc,id) {
            var data = {
                "id":id,
                "name":name,
                "desc":desc
            };
            $http.post('/deleteData',data).success(function(done){
                console.log("deletion data sent to backend");
            }).error(function(er){
                console.log("Error in deleter is ",er);
            });
        }
   }
    return obj;
});