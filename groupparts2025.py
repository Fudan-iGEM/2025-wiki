import os
# mkdir parts-json

# pip3 install scrapy
from time import sleep
import json as py_json
import requests

only_local = False
force_check_rfc = False
force_check_used = False

white_listed = ['BBa_B0030',
'BBa_I742151',
'BBa_J18920',
'BBa_J61100',
'BBa_K1151001',
'BBa_K118002',
'BBa_K118003',
'BBa_K118008',
'BBa_K2150031',
'BBa_K2306003',
'BBa_K3457006',
'BBa_K3648010',
'BBa_K4162003',
'BBa_K4162004',
'BBa_K4162005',
'BBa_K4162006',
'BBa_K4162010',
'BBa_K4162013',
'BBa_K4162016',
'BBa_K4162019',
'BBa_K4765020',
'BBa_K4765021',
'BBa_K4765111',
'BBa_K4655016',
'BBa_K4767017' ] # before 2024
white_listed += ['BBa_K5115058', 'BBa_K5115059', 'BBa_K5115086', 'BBa_K5115087' ] # fusion proteins from Fudan 2024
z = white_listed + ['BBa_K4162001', 'BBa_K4162009', 'BBa_K4162010', 'BBa_K4162011', 'BBa_K4162012',
 'BBa_K4162013', 'BBa_K4162014', 'BBa_K4162016', 'BBa_K4162019', 'BBa_K4162021', 'BBa_K4765022',
 'BBa_K4765117', 'BBa_K4765126' ] # testing software tool
z = sorted( list(set(z)) )
z += ['BBa_K5441013', 'BBa_K5470011',
'BBa_250R9OVR',
'BBa_K2753051',
'BBa_25VHXKNL',
'BBa_25TQG9WZ',
'BBa_25AIDL8P',
'BBa_25PI44VT',
'BBa_J433100',
'BBa_25YPQSK9',
'BBa_25TYRLM9',
'BBa_25IB5O7X',
'BBa_25F6RD26',
'BBa_25GARG3E',
'BBa_25M2Z9H7',
'BBa_2599SI53',
'BBa_25XKAUNH',
'BBa_25E9K479',
'BBa_25U7DH3R',
'BBa_25O1ZVOU',
'BBa_25MIG4EW',
'BBa_259HCU8C',
'BBa_256S6J1M',
'BBa_254K9906',
'BBa_25RCU5CB',
'BBa_25FOVO4C',
'BBa_25FQBGJW',
'BBa_K3748015',
'BBa_251I2TLJ',
'BBa_252BO17G',
'BBa_K3944000',
'BBa_259DU8YN',
'BBa_251T359T',
'BBa_25CLCLXX',
'BBa_2533RATE',
'BBa_25U88LU3',
'BBa_25O0GI56',
'BBa_25TMD7MC',
'BBa_255A36IQ',
'BBa_25Q67BOD',
'BBa_25TEB42Q',
'BBa_25ATGCHY',
'BBa_25Y6BTXZ',
'BBa_J435253',
'BBa_J435273',
'BBa_J435279',
'BBa_J435215',
'BBa_J435500',
'BBa_259JX52V',
'BBa_K3748013',
'BBa_K530004',
'BBa_K3190001',
'BBa_K3944010',
'BBa_K5470009',
'BBa_25AT6YR4',
'BBa_25JOF7TY',
'BBa_25MTFXKO',
'BBa_25N811P5',
'BBa_25AKJ83S',
'BBa_25FU0JM9',
'BBa_25JA9ZHO',
'BBa_251VI6SD',
'BBa_25L56M2M',
'BBa_25S7HMJ7',
'BBa_25T5YP8M',
'BBa_25DWU82I',
'BBa_25BWBNVL',
'BBa_25GIKETL',
'BBa_250UY7YR',
'BBa_25FQWVZE',
'BBa_25R85SZ9',
'BBa_25P3CYM6',
'BBa_258547VP',
'BBa_259AX3UO',
'BBa_255T0PHY',
'BBa_25T01PTJ',
'BBa_259Z131H',
'BBa_25R7QESE',
'BBa_25DI5UXV',
'BBa_25A00YSZ',
'BBa_25L2MY7F',
'BBa_25PHHOV9',
'BBa_257O6RCL',
'BBa_258CH7EU',
'BBa_25RJG3B2',
'BBa_250U3B6G',
'BBa_25GQIZIK',
'BBa_253K1B8N',
'BBa_25P0EZQP',
'BBa_2552AC6E',
'BBa_25IULUBT',
'BBa_25ZYL3GW',
'BBa_25H1VEJW',
'BBa_25FYK3TX',
'BBa_25PJP4LG',
'BBa_25FUWBU7',
'BBa_25PDQZ8Z',
'BBa_25DIWZUL',
'BBa_257IAIOG',
'BBa_25F4SCLY',
'BBa_25GCY7VQ',
'BBa_25B7ZBSD',
'BBa_25Q3F2B3',
'BBa_25RRB2RQ',
'BBa_25U7CTYJ',
'BBa_25B3A6Z8',
'BBa_25N9YOTD',
'BBa_25KYY8AI',
'BBa_25EI9P2P',
'BBa_25BWBNVL',
'BBa_258547VP',
'BBa_25DI5UXV',
'BBa_25RJG3B2' ]
# XXXXYYY no longer used by registry.igem.org z += range(0, 10)
subparts = []
sub_is_NOT_basic = []
basic_parts = []
parts_not_published = []
coding_not_ATG = []
known_basic_parts = ['BBa_B0030',
'BBa_I742151',
'BBa_J18920',
'BBa_J61100',
'BBa_K1151001',
'BBa_K118002',
'BBa_K118003',
'BBa_K118008',
'BBa_K2150031',
'BBa_K2306003',
'BBa_K3457006',
'BBa_K3648010',
'BBa_K4162001',
'BBa_K4162003',
'BBa_K4162004',
'BBa_K4162005',
'BBa_K4162006',
'BBa_K4765015',
'BBa_K4765016',
'BBa_K4765020',
'BBa_K4765021',
'BBa_K4765022',
'BBa_K5115000',
'BBa_K5115001',
'BBa_K5115002',
'BBa_K5115003',
'BBa_K5115004',
'BBa_K5115005',
'BBa_K5115006',
'BBa_K5115007',
'BBa_K5115008',
'BBa_K5115009',
'BBa_K5115010',
'BBa_K5115021',
'BBa_K5115022',
'BBa_K5115023',
'BBa_K5115024',
'BBa_K5115025',
'BBa_K5115026',
'BBa_K5115027',
'BBa_K5115028',
'BBa_K5115029',
'BBa_K5115030',
'BBa_K5115031',
'BBa_K5115032',
'BBa_K5115044',
'BBa_K5115045',
'BBa_K5115046',
'BBa_K5115047',
'BBa_K5115048',
'BBa_K5115049',
'BBa_K5115050',
'BBa_K5115054',
'BBa_K5115055',
'BBa_K5115069',
'BBa_K5115070',
'BBa_K5115071',
'BBa_K5115072',
'BBa_K5115073',
'BBa_K5115074',
'BBa_K5115075',
'BBa_K5115076',
'BBa_K5115083',
'BBa_K5115084',
'BBa_K5115085',
'BBa_K5115088',
'BBa_K5115089',
'BBa_K2753051',
'BBa_K3190001',
'BBa_K3748013',
'BBa_K3748015',
'BBa_K3944000',
'BBa_K3944010',
'BBa_K5441013',
'BBa_K5470009',
'BBa_K5470011',
'BBa_25VHXKNL',
'BBa_25TQG9WZ',
'BBa_25AIDL8P',
'BBa_252BO17G',
'BBa_25IB5O7X',
'BBa_250R9OVR',
'BBa_256S6J1M',
'BBa_25RCU5CB',
'BBa_25FOVO4C',
'BBa_259JX52V',
'BBa_25TYRLM9',
'BBa_25F6RD26',
'BBa_25GARG3E',
'BBa_25M2Z9H7',
'BBa_2599SI53',
'BBa_25FQBGJW' ]


table_th = ('Part Name', 'Short Description', 'Part Type', 'Designer(s)')
fff = open('groupparts.md', 'w')
fff.write('| |Slug |Part Name |Description |Part Type |Length |Modified at |Compatible |Used in |\n')
fff.write('|----|----|----|----|----|----|----|----|----|\n')

for zz in z:
    fetch_or_local = False
    if str(zz).startswith('BBa_'):
        part_name = zz
    else:
        part_name = 'BBa_K5643%s' % str(zz).zfill(3) # Team Fudan iGEM 2025
    if os.path.isfile('parts-json/%s_slug.json' % part_name):
        print('load:\t', part_name)
    elif not only_local:
        print('fetch:\t', part_name)
        if part_name.startswith('BBa_K'): # new in 2025, slug
            #driver.get("https://registry.igem.org/parts/bba-k%s" % part_name[5:] )
            os.system('scrapy fetch --nolog \
"https://api.registry.igem.org/v1/parts/slugs/bba-k%s" > parts-json/%s_slug.json' % (
                       part_name[5:],
                       part_name ))
        else:
            os.system('scrapy fetch --nolog \
"https://api.registry.igem.org/v1/parts/slugs/%s" > parts-json/%s_slug.json' % (
                       part_name.lower().replace('_', '-'),
                       part_name ))
        fetch_or_local = True
        sleep(2)
        # page = driver.page_source
        # if page:
        #     f = open('' % part_name, 'w')
        #     f.write(driver.page_source)
        #     f.close()
    try:
        ff = open('parts-json/%s_slug.json' % part_name, 'r')
    except Exception as e:
        if not only_local:
            print('!!\n\n   %s' % e)
        continue
    page = ff.read()
    ff.close()
    try:
        p2 = py_json.loads(page)
        if p2.get('error'):
            print('!! slug %s' % p2['error'])
            os.system('rm parts-json/%s_slug.json' % part_name)
            continue
        # {
        #   "uuid": "3e30ad4f-5360-49f7-bda4-60929b0f2971",
        #   "name": "BBa_B0030",
        #   "slug": "bba-b0030",
        #   "status": "published",
        #   "title": "RBS.1 (strong) -- modified from R. Weiss",
        #   "description": "Strong RBS based on Ron Weiss thesis. Strength is considered relative to \u003Cbb_part\u003EBBa_B0031\u003C/bb_part\u003E, \u003Cbb_part\u003EBBa_B0032\u003C/bb_part\u003E, \u003Cbb_part\u003EBBa_B0033\u003C/bb_part\u003E.\\n",
        #   "type": {
        #     "uuid": "9136e5fb-7232-4992-b828-d4fa4889ce63",
        #     "label": "RBS",
        #     "slug": "rbs"
        #   },
        #   "licenseUUID": "d6c69ca7-8be4-4bc0-b4a8-d3ae1d428aa6",
        #   "source": "",
        #   "sequence": "ATTAAAGAGGAGAAA",
        #   "audit": {
        #     "created": "2003-01-31T00:00:00.000Z",
        #     "updated": "2021-09-08T20:22:43.000Z"
        #   }
        # }
    except Exception as e:
        print('!! %s' % e)
        continue
    favorited = ''
    if p2['status'] != 'published':
        parts_not_published.append(part_name)
        print('-- %s blocked for doc, due to "%s"' % (part_name, p2['status']))
    fff.write('|%s |%s |%s |%s |%s |%s |%s |' % (part_name,
                    p2['uuid'],
                    p2['title'],
                    p2['description'].replace('\n', '    ').replace('\r', '    '), # <br>
                    p2['type']['label'],
                    len(p2['sequence']),
                    p2['audit']['updated'] ))
    if p2['type']['label'] == 'Coding' and p2['sequence'][:3] != 'ATG':
        coding_not_ATG.append(part_name)
    # https://api.registry.igem.org/v1/parts/3e30ad4f-5360-49f7-bda4-60929b0f2971/compatibilities
    # https://api.registry.igem.org/v1/parts/3e30ad4f-5360-49f7-bda4-60929b0f2971/uses
    if force_check_rfc or not os.path.isfile('parts-json/%s_rfc.json' % part_name):
        os.system('scrapy fetch --nolog \
"https://api.registry.igem.org/v1/parts/%s/compatibilities" > parts-json/%s_rfc.json' % (
                   p2['uuid'], part_name ))
    # {"rfc10":{"compatible":true,"motif":null,"index":null},"rfc1000":{"compatible":false,"motif":"GGTCTC","index":178}}
    if force_check_used or not os.path.isfile('parts-json/%s_used.txt' % part_name):
        os.system('scrapy fetch --nolog \
"https://api.registry.igem.org/v1/parts/%s/uses" > parts-json/%s_used.txt' % (
                   p2['uuid'], part_name ))
    ff = open('parts-json/%s_rfc.json' % part_name, 'r')
    p3 = py_json.loads( ff.read() )
    ff.close()
    if p3['rfc10']['compatible']:
        fff.write('RFC10 ')
    if p3['rfc1000']['compatible']:
        fff.write('RFC1000 ')
    ff = open('parts-json/%s_used.txt' % part_name, 'r')
    fff.write('|%s |\n' % ff.read().strip() )
    ff.close()
    if fetch_or_local:
        sleep(2)
    # https://api.registry.igem.org/v1/parts/3e30ad4f-5360-49f7-bda4-60929b0f2971/is-composite false
    # https://api.registry.igem.org/v1/parts/49ca5c96-e5c4-48ac-850b-3271e6b188eb/is-composite false
    # https://api.registry.igem.org/v1/parts/7137d74d-0891-4092-830b-d611700c49c4/is-composite true
    if part_name.startswith('BBa_25') and (not os.path.isfile('parts-json/%s_composition.json' % part_name) 
                                        or not os.path.isfile('parts-json/%s_basic')):
        # https://api.registry.igem.org/v1/parts/3e30ad4f-5360-49f7-bda4-60929b0f2971/composition
        resp= requests.get('https://api.registry.igem.org/v1/parts/%s/is-composite' % p2['uuid'])
        if resp.status_code == 200 and resp.text == 'true':
            os.system('scrapy fetch --nolog \
"https://api.registry.igem.org/v1/parts/%s/composition?page=1&pageSize=100" > parts-json/%s_composition.json' % (
                       p2['uuid'], part_name ))
            ff = open('parts-json/%s_composition.json' % part_name, 'r')
            p4 = py_json.loads( ff.read() )
            ff.close()
            while p4['total'] > len( p4['data'] ):
                p4['page'] += 1
                resp = requests.get('https://api.registry.igem.org/v1/parts/7137d74d-0891-4092-830b-d611700c49c4/composition?page=%s&pageSize=100' % (
                                     p2['uuid'], pp + 1))
                p4['data'] += resp.json()['data']
            for pp in p4['data']:
                if pp['componentName'] not in subparts:
                    subparts += [ pp['componentName'] ]
                    if pp['componentName'] not in basic_parts and pp['componentName'] not in known_basic_parts:
                        resp = requests.get('https://api.registry.igem.org/v1/parts/%s/is-composite' % pp['componentUUID'] )
                        if resp.status_code == 200 and resp.text == 'true':
                            sub_is_NOT_basic += [ pp['componentName'] ]
                        elif resp.status_code == 200 and resp.text == 'false':
                            basic_parts += [ pp['componentName'] ]
                        else:
                            print('-- cannot check subpart %s' % pp['componentName'])
            if p4['page'] > 1:
                print('-- update composition.json with complete data')
                ff = open('parts-json/%s_rfc.json' % part_name, 'w')
                ff.write( py_json.dumps(p4, indent=2) )
        elif resp.status_code == 200 and resp.text == 'false':
            os.system('touch parts-json/%s_basic' % part_name )
        else:
            sleep(10) # 429
            print('-- cannot extract subparts at this moment %s' % resp.status_code)
        sleep(2)
        # https://api.registry.igem.org/v1/parts/3e30ad4f-5360-49f7-bda4-60929b0f2971/documentation
#driver.quit() # end of zz in z


# fff.write('\n\n| | | Old Part | Description | Type | Not 2024 | Length | Compatible | |\n')
# fff.write('|----|----|----|----|----|----|----|----|----|\n')
fff.close()

if subparts:
    print('\n\n====\nBelow are subparts in composite parts:\n')
    for x in subparts:
        if x in z:
            print("'%s'," % x )
        else:
            print("'%s',\tNOT in List" % x )
if basic_parts:
    print('\n====\nBelow are basic parts:\n')
    for x in basic_parts:
        if x in z:
            print("'%s'," % x )
        else:
            print("'%s',\tNOT in List" % x )
if sub_is_NOT_basic:
    print('\n====\nSubparts are Not basic, and not white listed:\n')
    print('\n'.join(["'%s'," % x for x in sorted(sub_is_NOT_basic) ]))

if parts_not_published:
    print('\n\n====\nBelow are parts block for doc:\n')
    print('\n'.join(["'%s'," % x for x in sorted(parts_not_published) ]))

if coding_not_ATG:
    print('\n====\nCoding sequence must start with ATG:\n')
    print('\n'.join(["'%s'," % x for x in sorted(coding_not_ATG) ]))

print('\n\nCAUTION: remove files in parts-json for update\n')
#print('Validate with https://parts.igem.org/partsdb/search_1000.cgi?q=K5115000\n\n\n\n')
