/*!
 *
 *  Web Starter Kit
 *  Copyright 2014 Google Inc. All rights reserved.
 *
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License
 *
 */
 'use strict';

(function() {
  var querySelector = document.querySelector.bind(document);

  var navdrawerContainer = querySelector('.navdrawer-container');
  var body = document.body;
  var appbarElement = querySelector('.app-bar');
  var menuBtn = querySelector('.menu');
  var main = querySelector('main');

  function closeMenu() {
    body.classList.remove('open');
    appbarElement.classList.remove('open');
    navdrawerContainer.classList.remove('open');
  }

  function toggleMenu() {
    body.classList.toggle('open');
    appbarElement.classList.toggle('open');
    navdrawerContainer.classList.toggle('open');
  }

  main.addEventListener('click', closeMenu);
  menuBtn.addEventListener('click', toggleMenu);
  navdrawerContainer.addEventListener('click', function(event) {
    if (event.target.nodeName === 'A' || event.target.nodeName === 'LI') {
      closeMenu();
    }
  });
})();

window.addEventListener('load', function() {
  console.log('Starting up graphs hopefully...');
  var data = [{
    sale: '202',
    year: '2000'
  }, {
    sale: '215',
    year: '2001'
  }, {
    sale: '179',
    year: '2002'
  }, {
    sale: '199',
    year: '2003'
  }, {
    sale: '134',
    year: '2003'
  }, {
    sale: '176',
    year: '2010'
  }];

  var data2 = [{
    sale: '152',
    year: '2000'
  }, {
    sale: '189',
    year: '2002'
  }, {
    sale: '179',
    year: '2004'
  }, {
    sale: '199',
    year: '2006'
  }, {
    sale: '134',
    year: '2008'
  }, {
    sale: '176',
    year: '2010'
  }];

  var vis = d3.select('#visualisation');
  var WIDTH = 1000;
  var HEIGHT = 500;
  var MARGINS = {
    top: 20,
    right: 20,
    bottom: 20,
    left: 50
  };
  var xScale = d3.scale.linear()
    .range([MARGINS.left, WIDTH - MARGINS.right])
    .domain([2000, 2010]);
  var yScale = d3.scale.linear()
    .range([HEIGHT - MARGINS.top, MARGINS.bottom])
    .domain([134, 215]);
  var xAxis = d3.svg.axis().scale(xScale);
  var yAxis = d3.svg.axis()
    .scale(yScale)
    .orient('left');

  vis.append('svg:g')
    .attr('class', 'axis')
    .attr('transform', 'translate(0,' + (HEIGHT - MARGINS.bottom) + ')')
    .call(xAxis);
  vis.append('svg:g')
    .attr('class', 'axis')
    .attr('transform', 'translate(' + (MARGINS.left) + ')')
    .call(yAxis);

  var lineGen = d3.svg.line()
    .x(function(d) {
      return xScale(d.year);
    })
    .y(function(d) {
      return yScale(d.sale);
    })
    .interpolate('basis');

  vis.append('svg:path')
    .attr('d', lineGen(data))
    .attr('stroke', 'green')
    .attr('stroke-width', 2)
    .attr('fill', 'none');

  vis.append('svg:path')
    .attr('d', lineGen(data2))
    .attr('stroke', 'blue')
    .attr('stroke-width', 2)
    .attr('fill', 'none');
});
