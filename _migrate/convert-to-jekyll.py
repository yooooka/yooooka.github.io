#!/usr/bin/env python
#import glob, os
import os
import re
from BeautifulSoup import BeautifulSoup as Soup
import yaml
import string

thumbs = Soup(open('thumbs.html').read())

for fn in os.listdir('.'):
    if os.path.isfile(fn) and fn[0:2] == 'go':
        handle = open(fn).read()
        soup = Soup(handle)
        yearTags = soup.find('p', {"class": "year"}).contents[0].split(',')
        yearTags = [str(x.strip()) for x in yearTags]
        year = yearTags.pop(0)
        doc = {
            'layout': 'sample',
            'category': 'go',
            'title': str(soup.h2.contents[0]),
            'images': [str(x['src']) for x in soup.findAll('img')],
            'tags': yearTags,
            'thumb': str(thumbs.find('a', {'href': re.compile(fn)}).img['src']),
            'sample_link': '',
        }
        titleUrl = doc['title'].lower()
        titleUrl = titleUrl.translate(string.maketrans(" ","-"), string.punctuation)
        fileName = '%s-01-01-%s.md' % (year, titleUrl)
        doc['permalink'] = '/samples/%s.html' % titleUrl
        if doc['thumb'][0] != '/':
            doc['thumb'] = '/' + doc['thumb']
        try:
            doc['sample_link'] = str(soup.find('a', {"target": "_blank"})['href'])
        except:
            doc['sample_link'] = ''
            content = soup.find('div',
                                {'class': 'explanation'}).findAll('p')[1].contents[0]
        out = '---\n'
        out += yaml.dump(doc, default_flow_style=False)
        out += '---\n'
        out += content

        outFile = open('generated/'+fileName, "w")
        outFile.write(out)
        outFile.close()
