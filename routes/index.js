var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var ProCard = mongoose.model('ProCard'); //charge le modèle de Carte Pro

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

// Cette route permet de récupérer toutes les cartes pro
router.get('/proCards', function(req, res, next){
  ProCard.find(function(err, proCards){
    if(err){ return next(err); }

    res.json(proCards);
  });
});

//Cette route permet d'enregistrer une carte pro en base de données
router.post('/proCards', function(req, res, next){
  var proCard = new ProCard(req.body);

  proCard.save(function(err, proCard){
    if(err){ return next(err); }

    res.json(proCard);
  });
});

router.param('proCard', function(req, res, next, id){
  var query = ProCard.findById(id);

  query.exec(function(err, proCard){
    if(err){ return next(err); }
    if(!proCard){ return next(new Error('can\'t find the corresponding proCard')); }

    req.proCard = proCard;
    return next();
  });
});

//Cette route permet de récuperer une carte pro selon son ID
router.get('/proCards/:proCard', function(req, res) {
    res.json(req.proCard);
});

module.exports = router;
