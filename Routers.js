'use strict';

module.exports = function(app){
    var jsonku = require('./Controllers')

    app.route('/')
    .get(jsonku.index);

    app.route('/tampil')
    .get(jsonku.showImage);

    app.route('/tampil/:id')
     .get(jsonku.showFromid);

     app.route('/tambah')
     .post(jsonku.addImage);

     app.route('/ubah')
     .put(jsonku.changeImage);

     app.route('/hapus')
     .delete(jsonku.deleteImage);

//      app.route('/tampilmatakuliah')
//      .get(jsonku.tampilGroupmatakuliah);
}