/**
 * makes a request to the defined url and transforms it through Sharp
 *
 */

// you can use any library that accepts stream
const request = require('request').defaults({ encoding: null });
const sharp = require('sharp');


/**
 * Width and height are optional, leave one of the two undefined to preserve the aspect ratio when resizing
 * @param req.query.url url of the image to be transformed
 * @param req.query.w output image width
 * @param req.query.h output image height
 */
exports.resize = function resize(req, res) {
  const w = req.query.w ? parseInt(req.query.w) : null;
  const h = req.query.h ? parseInt(req.query.h) : null;
  
  let transformation = sharp().resize(w, h);
  
  // if your browser supports webp
  if(req.headers.accept && req.headers.accept.indexOf('image/webp') !== -1){
    transformation = sharp().resize(w,h).webp();
  }
  
  request(req.query.url)
    .pipe(transformation)
    .pipe(res);
};
