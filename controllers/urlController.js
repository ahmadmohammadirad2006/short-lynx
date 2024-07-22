const Url = require('./../models/urlModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

exports.createUrl = catchAsync(async (req, res, next) => {
  const newUrl = await Url.create({
    address: req.body.address,
  });

  res.status(201).json({
    status: 'success',
    data: {
      newUrl,
    },
  });
});

exports.getUrl = catchAsync(async (req, res, next) => {
  const url = await Url.findById(req.params.id);

  if (!url) return next(new AppError('No url found with that ID', 400));

  res.status(200).json({
    status: 'success',
    data: {
      url,
    },
  });
});

exports.getAllUrls = catchAsync(async (req, res, next) => {
  const urls = await Url.find();

  // SEND RESPONSE
  res.status(200).json({
    status: 'success',
    results: urls.length,
    data: {
      urls,
    },
  });
});

exports.deleteUrl = catchAsync(async (req, res, next) => {
  const url = await Url.findByIdAndDelete(req.params.id);

  if (!url) return next(new AppError('No document found with that ID', 400));

  res.status(204).json({
    status: 'success',
    data: null,
  });
});

exports.updateUrl = catchAsync(async (req, res, next) => {
  const updatedUrl = await Url.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!updatedUrl) return next(new AppError('No url found with that ID', 400));

  res.status(200).json({
    status: 'success',
    data: {
      updatedUrl,
    },
  });
});
