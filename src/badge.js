const { JSDOM } = require('jsdom');
const ns = 'http://www.w3.org/2000/svg';

function generateBadge(name, deps, version, downloads) {
  const document = new JSDOM(`<svg xmlns="${ns}"></svg>`, {contentType: 'image/svg+xml'}).window.document;

  const svg = document.getElementsByTagName('svg')[0];

  const defs = document.createElementNS(ns, 'defs');
  defs.innerHTML = "<style type='text/css'>@import url('https://fonts.googleapis.com/css?family=Roboto+Mono:400,100,100italic,300,300italic,400italic,500,500italic,700,700italic,900,900italic');</style>"
  svg.appendChild(defs);

  const letterWidth = 7.201171875;
  const rectWidth = 300+(name.length > 18 ? (name.length - 18)*letterWidth : 0);

  const rect = document.createElementNS(ns, 'rect');
  svg.appendChild(rect);
  rect.setAttribute('x', 0);
  rect.setAttribute('y', 0);
  rect.setAttribute('rx', 2);
  rect.setAttribute('ry', 2);
  rect.setAttribute('width', rectWidth);
  rect.setAttribute('height', 60);
  rect.setAttribute('fill', 'rgb(244, 244, 242)');
  rect.setAttribute('stroke', '#CB3837');
  rect.setAttribute('stroke-width', 2);

  const npmLogo = document.createElementNS(ns, 'image');
  svg.appendChild(npmLogo);
  npmLogo.setAttribute('href', 'https://upload.wikimedia.org/wikipedia/commons/d/db/Npm-logo.svg');
  npmLogo.setAttribute('x', 10);
  npmLogo.setAttribute('y', 10);
  npmLogo.setAttribute('width', 100);

  const pkgName = document.createElementNS(ns, 'text');
  svg.appendChild(pkgName);
  pkgName.setAttribute('x', 120);
  pkgName.setAttribute('y', 20);
  pkgName.setAttribute('fill', '#111111');
  pkgName.setAttribute('font-family', 'Roboto Mono');
  pkgName.setAttribute('font-weight', 600);
  pkgName.setAttribute('font-size', '12px');
  pkgName.innerHTML = "npm i "+name;

  const pkgDeps = document.createElementNS(ns, 'text');
  svg.appendChild(pkgDeps);
  pkgDeps.setAttribute('x', 120);
  pkgDeps.setAttribute('y', 34);
  pkgDeps.setAttribute('fill', '#111111');
  pkgDeps.setAttribute('font-family', 'Roboto Mono');
  pkgDeps.setAttribute('font-weight', 400);
  pkgDeps.setAttribute('font-size', '10px');
  pkgDeps.innerHTML = deps+" "+(deps===1?"dependency":"dependencies");

  const pkgVer = document.createElementNS(ns, 'text');
  svg.appendChild(pkgVer);
  pkgVer.setAttribute('x', rectWidth-(10+(version.length*letterWidth)));
  pkgVer.setAttribute('y', 34);
  pkgVer.setAttribute('fill', '#111111');
  pkgVer.setAttribute('font-family', 'Roboto Mono');
  pkgVer.setAttribute('font-weight', 600);
  pkgVer.setAttribute('font-size', '10px');
  pkgVer.innerHTML = "v"+version;

  const pkgDls = document.createElementNS(ns, 'text');
  svg.appendChild(pkgDls);
  pkgDls.setAttribute('x', 120);
  pkgDls.setAttribute('y', 46);
  pkgDls.setAttribute('fill', '#111111');
  pkgDls.setAttribute('font-family', 'Roboto Mono');
  pkgDls.setAttribute('font-weight', 400);
  pkgDls.setAttribute('font-size', '10px');
  pkgDls.innerHTML = Intl.NumberFormat('en', {notation:'compact'}).format(downloads)+" weekly downloads";

  return document.documentElement.outerHTML;
}

module.exports.generateBadge = generateBadge;
