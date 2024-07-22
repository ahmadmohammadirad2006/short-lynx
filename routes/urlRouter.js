const express = require('express');

const router = express.Router();

const urlController = require('../controllers/urlController');
const authController = require('../controllers/authController');

router.route('/').get(urlController.getAllUrls).post(urlController.createUrl);
router.route('/:id').get(urlController.getUrl);

router.use(authController.isAdmin);

router
  .route('/:id')
  .patch(urlController.updateUrl)
  .delete(urlController.deleteUrl);

module.exports = router;
