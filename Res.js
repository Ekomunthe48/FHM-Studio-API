'use strict';

exports.ok = function(values, res){
    var data = {
        'status' : 200,
        'values' : values
    };

     res.json(data);
     res.end();
}

//response untuk nested api
exports.oknested = function(values,res){
    //akumulasi
    const hasil = values.reduce((akumulasikan, item) =>{
        //tentukan key group
        if(akumulasikan[item.nama]){
            //variabel group nama
            const group = akumulasikan[item.nama];
            //cek isi array matkul
            if(Array.isArray(group.matakulia)){
                //tambahkan ke grup matakuliah
                group.matakulia.push(item.matakuliah);

            }else {
                group.matakulia = [group.matakuliah,item.matakuliah];
            }
        }else {
            akumulasikan[item.nama] = item;
        }
        return akumulasikan;
    }, {});
    var data = {
        'status' : 200,
        'values' : hasil
    };
     res.json(data);
     res.end();
}