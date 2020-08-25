'use strict';

var response = require('./Res');
const Conn = require('./Connect');

var multer = require('multer')
var path = require('path')

const storage = multer.diskStorage({
    destination: function(req,file,cb) {
        cb(null, './uploads/')
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
    }
})

const upload = multer({
    storage: storage
}).single('picture');

const { Sequelize } = require('sequelize');

const Gambar = Conn.define('gambars', {
    id: {
        field: 'id',
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    title: {
        field: 'title',
        type: Sequelize.STRING
    },
    date: {
        field: 'date',
        type: Sequelize.DATE
    },
    picture: {
        field: 'picture',
        type: Sequelize.STRING
    }
}, {
    timestamps: false
})

exports.index = function (req, res) {
    response.ok("REST API is working", res)
};

//menampilkan data mahasiswa
exports.showImage = function (req, res) {
    Gambar.findAll().then((picture) => {
        res.json(picture);
    })
}

//menampilkan data mahasiswa berdasarkan id
exports.showFromid = function (req, res) {
    let id = req.params.id;
    Gambar.findByPk(id).then((gambar) => {
        if (gambar) {
            res.json(gambar);
        } else {
            console.log(err)
            res.status(500).send()
        }
    })
}

//menambahkan data mahasiswa
exports.addImage = async (req, res) => {
    try {
        console.log('body: ' + JSON.stringify(req.body))
        await upload(req,res,err => {
            Gambar.create({
                title: req.body.title,
                date:  req.body.date,
                picture: 'http://localhost:3010/' + req.file.path
            })
        })
        //console.log('image: ')
        res.json({status: 'Upload Data Success'})
    } catch (err) {
        console.log(err)
        res.status(500).send()
    }
}

// mengubah data berdasarkan id
exports.changeImage = async (req, res) => {
    try {
        let image = await upload(req, res, err => {
        console.log('body: ' + JSON.stringify(req.body))
        Gambar.update({    
            title: req.body.title,
            date:  req.body.date,
            picture: 'http://localhost:3010/' + req.file.path
        },
        { where: { id: req.body.id } })
        
        console.log(req.body)
        console.log('image: ' + JSON.stringify(image))
        res.json({status: 'Change Data Success'})
    })
    } catch (err) {
        console.log(err)
        res.status(500).send()
    }
}



// menghapus data berdasarkan id
exports.deleteImage = async function (req, res) {
    await Gambar.destroy({ where: { id: req.body.id } }).then((picture) => {
        res.json({status: 'Delete Data Success'});
    })

};

// //menampilkan matakuliah group

// exports.tampilGroupmatakuliah = function (req,res){
//     connection.query('SELECT mahasiswa.id_mahasiswa, mahasiswa.nim, mahasiswa.nama, mahasiswa.jurusan, matakulia.id_matakuliah, matakulia.matakuliah, matakulia.sks FROM krs JOIN matakulia JOIN mahasiswa WHERE krs.id_matakuliah = matakulia.id_matakuliah AND krs.id_mahasiswa = mahasiswa.id_mahasiswa ORDER BY mahasiswa.id_mahasiswa',
//         function(error, rows, fileds){
//            if(error){
//                console.log(error);
//            } else{
//                response.oknested(rows, res);
//            }
//         }
//     )

