/* Public read-only academic website. Edit content.json to update. */
const $ = selector => document.querySelector(selector);
const elem = (tag, className = '', value = '') => { const node = document.createElement(tag); if (className) node.className = className; node.textContent = value; return node; };
const external = (href, text) => { const node = elem('a', '', text); node.href = href; node.target = '_blank'; node.rel = 'noopener noreferrer'; return node; };
function cvRow(target, date, primary, institution, url = '', detail = '', tag = '') {
 const row = elem('div','cv-row'); row.append(elem('div','cv-date',date));
 const content=elem('div'); const head=elem('div','cv-primary',primary);
 if(tag)head.append(elem('span','cv-tag',tag)); content.append(head);
 if(institution){const line=elem('div','cv-secondary'); if(url)line.append(external(url,institution+' ↗'));else line.textContent=institution;content.append(line)}
 if(detail)content.append(elem('div','cv-detail',detail));row.append(content);$(target).append(row);
}
function publication(target,p,i,selected=false){const row=elem('div','pub-item'+(selected?' selected-pub':''));row.append(elem('span','pub-index',String(i+1).padStart(2,'0')));const details=elem('div');const link=external(p.url||('https://doi.org/'+p.doi),p.title+' ↗');link.className='pub-title';details.append(link,elem('div','pub-meta',p.journal+' · '+p.year),elem('div','pub-authors',p.authors));row.append(details);$(target).append(row)}
async function load(){let data;
 try{const response=await fetch('SiyuChen_content_FIXED.json',{cache:'no-store'});if(!response.ok)throw new Error('HTTP '+response.status);data=await response.json()}
 catch(error){const warning=elem('p','source-note','Unable to load content.json. Check that it contains valid JSON and is saved in the repository root.');$('#education-list').append(warning);console.error(error);return}
 $('#person-name').textContent=data.name;$('#hero-role').textContent=data.role+' · '+data.affiliation;
 $('#affiliation').textContent=data.affiliation;$('#location').textContent=data.location;$('#copyright-year').textContent=new Date().getFullYear();
 const about=$('#about-long');(data.about_paragraphs||[data.about]).forEach(par=>about.append(elem('p','',par)));
 const links=[['Email','mailto:'+data.email],['ORCID',data.orcid],['PubMed',data.pubmed]];if(data.scholar)links.push(['Google Scholar',data.scholar]);
 if(data.website)links.push(['Institutional profile',data.website]);
 for(const selector of ['#profile-links','#footer-links'])for(const [label,url] of links){const link=external(url,label+' ↗');$(selector).append(link)}
 $('#email-link').href='mailto:'+data.email;$('#email-link').textContent=data.email+' ↗';$('#pubmed-link').href=data.pubmed;
 (data.education||[]).forEach(e=>cvRow('#education-list',e.years,e.degree,e.institution,e.url,'',e.kind==='Academic visit'?'Visiting appointment':''));
 (data.experience||[]).forEach(e=>cvRow('#experience-list',e.years,e.role,e.institution,e.url));
 const chosen=data.publications.filter(p=>p.selected);chosen.forEach((p,i)=>publication('#featured-list',p,i,true));
 const years=[...new Set(data.publications.map(p=>p.year))].sort((a,b)=>b-a);years.forEach(year=>{const option=elem('option','',String(year));option.value=year;$('#pub-year').append(option)});
 $('#pub-count').textContent=data.publications.length+' peer-reviewed articles · Search by title, author, journal, or year';
 function render(){const search=$('#pub-search').value.toLowerCase().trim(),year=$('#pub-year').value,list=$('#pub-list');list.replaceChildren();const papers=[...data.publications].sort((a,b)=>b.year-a.year||a.number-b.number).filter(p=>(year==='all'||String(p.year)===year)&&[p.title,p.authors,p.journal,String(p.year)].join(' ').toLowerCase().includes(search));papers.forEach((p,i)=>publication('#pub-list',p,i));if(!papers.length)list.append(elem('p','source-note','No papers found.'))}
 $('#pub-search').addEventListener('input',render);$('#pub-year').addEventListener('change',render);render();
 (data.teaching||[]).forEach(e=>cvRow('#teaching-list',e.years,e.role,e.institution,e.url,e.details));
 (data.awards||[]).forEach(e=>cvRow('#awards-list',e.year,e.name,e.organization));
 (data.service||[]).forEach(e=>cvRow('#service-list','',e.organization,e.role));
 (data.news||[]).forEach(e=>{const row=elem('div','cv-row');row.append(elem('div','cv-date',e.date));const body=elem('div','cv-primary',e.text);body.style.fontWeight='450';if(e.url)body.append(document.createTextNode(' '),external(e.url,'Read more ↗'));row.append(body);$('#news-list').append(row)})
}
$('#menu').addEventListener('click',()=>{const nav=$('#nav');const active=nav.classList.toggle('open');$('#menu').setAttribute('aria-expanded',active)});
document.querySelectorAll('#nav a').forEach(link=>link.addEventListener('click',()=>{$('#nav').classList.remove('open');$('#menu').setAttribute('aria-expanded','false')}));
load();
