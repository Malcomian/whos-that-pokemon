const express = require('express');
const router = express.Router();
const Meme = require('../models/meme');
const uuidv4 = require('uuid/v4');

const {
  ensureAuthenticated,
  forwardAuthenticated
} = require('../config/auth');

const defaultRoute = require('../config/defaultRoute');

// Welcome Page
router.get(`${defaultRoute}/`, forwardAuthenticated, (req, res) => {
  res.render('welcome')
});

class State {
  constructor() {
    this.resetState();
  }
  resetState() {
    this.account = '';
    this.about = '';
    return this;
  }
}

var state = new State();

// Dashboard
router.get(`${defaultRoute}/dashboard`, ensureAuthenticated, (req, res) => {
  state.resetState();
  Meme.find({user_email: req.user.email}).exec((err, data) => {
    res.render('dashboard', {
      user: req.user,
      state: state,
      memes: data
    })
  })
})

// Account
router.get(`${defaultRoute}/account`, ensureAuthenticated, (req, res) => {
  state.resetState().account = 'active';
  res.render('account', {
    user: req.user,
    state: state
  })
})

// About
router.get(`${defaultRoute}/about`, ensureAuthenticated, (req, res) => {
  state.resetState().about = 'active';
  res.render('about', {
    user: req.user,
    state: state
  })
})

// New
router.get(`${defaultRoute}/new`, ensureAuthenticated, (req, res) => {
  state.resetState();
  res.render('new', {
    user: req.user,
    state: state
  })
})

router.post(`${defaultRoute}/memes/create`, ensureAuthenticated, (req, res) => {
  var user_email = req.user.email;
  var uuid = uuidv4();
  var text = req.body['name']
  var textX = req.body['text-left']
  var textY = req.body['text-top']
  var textScale = req.body['text-scale']
  var url = req.body['url']
  var imgX = req.body['img-left']
  var imgY = req.body['img-top']
  var imgScale = req.body['img-scale']
  var rendering = req.body['rendering']
  var meme = new Meme({
    uuid,
    text,
    textX,
    textY,
    textScale,
    url,
    imgX,
    imgY,
    imgScale,
    rendering,
    user_email
  });
  console.log(`User "${req.user.name}" with email: ${req.user.email} is making a meme, "${text}"!`)
  meme.save();
  res.redirect(`${defaultRoute}/memes/${uuid}`)
})

router.get(`${defaultRoute}/memes/:id`, (req, res) => {
  Meme.findOne({ uuid: req.params.id }, (err, data) => {
    if (err) {
      console.log(err);
    } else {
      res.render('show', {
        meme: data
      })
    }
  })
})

router.get(`${defaultRoute}/memes/:id/edit`, ensureAuthenticated, (req, res) => {
  state.resetState();
  Meme.findOne({ uuid: req.params.id }, (err, data) => {
    if (err) {
      console.log(err);
    } else {
      res.render('edit', {
        meme: data,
        state: state
      })
    }
  })
})

router.post(`${defaultRoute}/memes/:id/update`, ensureAuthenticated, (req, res) => {
  Meme.updateOne({ uuid: req.params.id }, { $set: { text: req.body['name'], textX: req.body['text-left'], textY: req.body['text-top'], textScale: req.body['text-scale'], url: req.body['url'], imgX: req.body['img-left'], imgY: req.body['img-top'], imgScale: req.body['img-scale'], rendering: req.body['rendering'], user_email: req.user.email } }, (err) => {
    if(err) {
      console.log(err)
    } else {
      res.redirect(`${defaultRoute}/memes/${req.params.id}`)
    }
  })
})

router.post(`${defaultRoute}/memes/:id/delete`, ensureAuthenticated, (req, res) => {
  Meme.findOne({uuid: req.params.id}, (err, data) => {
    if (err) {
      console.log(err)
    } else {
      console.log(`User "${req.user.name}" is deleting meme, "${data.text}"!`)
      if(data.user_email == req.user.email) {
        Meme.deleteOne({uuid: req.params.id}, (err) => {
          if (err) {
            console.log(err)
          } else {
            res.redirect(`${defaultRoute}/dashboard`)
          }
        })
      } else {
        res.redirect(`${defaultRoute}/`)
      }
    }
  })
})

module.exports = router;
