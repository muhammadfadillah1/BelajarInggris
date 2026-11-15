// ===== IELTS Writing Task 1: grafik dan diagram =====
(function(){
const INK="#1F2D3A",GRID="#C9D3DA",MUT="#5A6B78";
const T=(x,y,t,sz,f,a)=>Tx(x,y,t,sz||7,f||INK,a);
const Ln=(x1,y1,x2,y2,c,w,extra)=>'<line x1="'+x1+'" y1="'+y1+'" x2="'+x2+'" y2="'+y2+'" stroke="'+c+'" stroke-width="'+(w||1)+'"'+(extra||'')+'/>';
const BG=R(0,0,320,200,"#FFFFFF");
function arrow(x1,y1,x2,y2){
  const a=Math.atan2(y2-y1,x2-x1),h=5;
  const p1=[x2-h*Math.cos(a-0.5),y2-h*Math.sin(a-0.5)],p2=[x2-h*Math.cos(a+0.5),y2-h*Math.sin(a+0.5)];
  return Ln(x1,y1,x2,y2,INK,1.6)+'<polygon points="'+x2+','+y2+' '+p1[0].toFixed(1)+','+p1[1].toFixed(1)+' '+p2[0].toFixed(1)+','+p2[1].toFixed(1)+'" fill="'+INK+'"/>';
}

/* bar chart: penggunaan internet harian menurut usia */
function barSvg(){
  const cats=["16-24","25-44","45-64","65+"],a=[88,80,55,18],b=[98,95,82,52];
  const y0=162,sc=1.2; // 100% = 120px
  let s=BG+T(160,13,"Daily internet users by age group (%)",9);
  s+=R(78,19,8,8,"#5B8BBF")+T(90,26,"2010",7,INK,"start")+R(120,19,8,8,"#E8913A")+T(132,26,"2020",7,INK,"start");
  [0,25,50,75,100].forEach(v=>{const y=y0-v*sc;s+=Ln(36,y,306,y,GRID,.8)+T(32,y+2.5,v,7,MUT,"end")});
  cats.forEach((c,i)=>{
    const x=48+i*65;
    s+=R(x,y0-a[i]*sc,24,a[i]*sc,"#5B8BBF")+R(x+26,y0-b[i]*sc,24,b[i]*sc,"#E8913A");
    s+=T(x+12,y0-a[i]*sc-3,a[i],6.5)+T(x+38,y0-b[i]*sc-3,b[i],6.5)+T(x+25,y0+12,c,8);
  });
  s+=Ln(36,y0,306,y0,INK,1.4)+T(171,y0+25,"Age group",7,MUT);
  return svg(s);
}

/* line graph: sumber listrik 2000-2020 */
function lineSvg(){
  const yrs=[2000,2005,2010,2015,2020],coal=[60,55,45,30,20],ren=[5,10,20,35,50],gas=[35,35,35,35,30];
  const x=i=>50+i*62,y0=160,sc=2;
  let s=BG+T(160,13,"Electricity generation by source (%)",9);
  s+=Ln(104,23,116,23,"#444",2.5)+T(119,26,"Coal",7,INK,"start")+Ln(152,23,164,23,"#2B8A57",2.5)+T(167,26,"Renewables",7,INK,"start")+Ln(222,23,234,23,"#C98F00",2.5)+T(237,26,"Gas",7,INK,"start");
  [0,20,40,60].forEach(v=>{const y=y0-v*sc;s+=Ln(40,y,300,y,GRID,.8)+T(36,y+2.5,v,7,MUT,"end")});
  const pl=(arr,c)=>'<polyline fill="none" stroke="'+c+'" stroke-width="2.4" stroke-linejoin="round" points="'+arr.map((v,i)=>x(i)+","+(y0-v*sc)).join(" ")+'"/>'+arr.map((v,i)=>Ci(x(i),y0-v*sc,3,c)).join('');
  s+=pl(coal,"#444")+pl(ren,"#2B8A57")+pl(gas,"#C98F00");
  coal.forEach((v,i)=>{if(i%2===0||i===4)s+=T(x(i),y0-v*sc-6,v,6.5,"#444")});
  ren.forEach((v,i)=>{if(i%2===0||i===4)s+=T(x(i),y0-v*sc+(v<12?-7:12),v,6.5,"#1F6B43")});
  yrs.forEach((v,i)=>{s+=T(x(i),y0+12,v,7.5)});
  s+=Ln(40,y0,300,y0,INK,1.4)+T(170,y0+25,"Year",7,MUT);
  return svg(s);
}

/* pie chart: pengeluaran keluarga */
function pieSvg(){
  const parts=[["Housing",35,"#5B8BBF"],["Food",25,"#E8913A"],["Transport",15,"#2B8A57"],["Education",10,"#A8386E"],["Entertainment",10,"#C98F00"],["Savings",5,"#7A8794"]];
  const cx=92,cy=112,r=64;let a0=0,s=BG+T(160,13,"How a family spends its monthly income",9);
  parts.forEach(p=>{
    const a1=a0+p[1]/100*Math.PI*2,x0=cx+r*Math.sin(a0),y0=cy-r*Math.cos(a0),x1=cx+r*Math.sin(a1),y1=cy-r*Math.cos(a1);
    s+='<path d="M'+cx+' '+cy+' L'+x0.toFixed(1)+' '+y0.toFixed(1)+' A'+r+' '+r+' 0 '+(a1-a0>Math.PI?1:0)+' 1 '+x1.toFixed(1)+' '+y1.toFixed(1)+' Z" fill="'+p[2]+'" stroke="#fff" stroke-width="1.5"/>';
    if(p[1]>=10){const m=(a0+a1)/2;s+=T(cx+r*.66*Math.sin(m),cy-r*.66*Math.cos(m)+3,p[1]+"%",8,"#fff")}
    a0=a1;
  });
  parts.forEach((p,i)=>{s+=R(184,40+i*22,10,10,p[2],2)+T(200,49+i*22,p[0]+" "+p[1]+"%",8,INK,"start")});
  return svg(s);
}

/* diagram proses: daur ulang botol plastik */
function processSvg(){
  const bx=(x,y,n,t1,t2,c)=>R(x,y,84,44,c,6)+Ci(x+10,y+10,8,"#fff")+T(x+10,y+13,n,9,INK)+T(x+46,y+22,t1,8,"#fff")+T(x+46,y+33,t2||"",8,"#fff");
  let s=BG+T(160,15,"Recycling plastic bottles",9);
  s+=bx(10,40,1,"Bottles are","collected","#5B8BBF")+bx(118,40,2,"Plastic is","sorted","#2B8A57")+bx(226,40,3,"Bottles are","cleaned","#C98F00");
  s+=bx(226,128,4,"Plastic is","melted","#C0412E")+bx(118,128,5,"New products","are made","#A8386E");
  s+=arrow(95,62,116,62)+arrow(203,62,224,62)+arrow(268,86,268,126)+arrow(224,150,203,150);
  s+=T(160,190,"Final product: clothes, bags, new bottles",7.5,MUT);
  return svg(s);
}

SCENES.push(
{ id:"p17", lv:5, title:"Bar chart: internet use", need:3, minw:8,
  desc:"IELTS Task 1 bar chart: percentage of people who use the internet daily in four age groups, 2010 vs 2020. 16-24: 88% to 98%. 25-44: 80% to 95%. 45-64: 55% to 82%. 65+: 18% to 52%.",
  hint:"Tulis ringkasan Task 1 (3 sampai 4 kalimat): gambaran umum, perubahan terbesar, dan perbandingan antar kelompok.",
  keys:[{n:"jenis grafik (chart, percentage, shows)",g:["chart","graph","bar","percentage","figures","shows","illustrates","compares","proportion"]},{n:"tren naik (increase, rose, grew)",g:["increase","increased","rose","rise","grew","growth","higher","climbed","risen","went"]},{n:"kelompok usia (age, 65+, youngest)",g:["age","aged","groups","group","oldest","youngest","65","elderly","older","younger"]},{n:"perubahan terbesar (largest, dramatic)",g:["largest","biggest","most","greatest","dramatic","dramatically","significant","significantly","sharply","tripled"]},{n:"tahun (2010, 2020, decade)",g:["2010","2020","decade","years","period"]}],
  model:["The bar chart compares the percentage of people who used the internet every day in four age groups in 2010 and 2020. Overall, internet use rose in every one of the age groups. The increase was largest among people aged 65 and over, where the figure grew from 18% to 52%. By contrast, the youngest group changed little, rising from 88% to 98%.","The chart shows that daily internet use increased in all age groups between 2010 and 2020. The oldest group saw the most dramatic rise, from 18% to 52%, whereas the 16-24 group was already high at 88% and reached 98%. Overall, the gap between young and old users became much smaller."],
  svg:barSvg },
{ id:"p18", lv:5, title:"Line graph: electricity sources", need:3, minw:8,
  desc:"IELTS Task 1 line graph: electricity generation by source (%), 2000-2020. Coal: 60, 55, 45, 30, 20. Renewables: 5, 10, 20, 35, 50. Gas: 35, 35, 35, 35, 30 (almost stable).",
  hint:"Tulis ringkasan Task 1 (3 sampai 4 kalimat). Perhatikan dua garis yang saling berpotongan dan satu garis yang hampir datar.",
  keys:[{n:"jenis grafik (graph, shows, percentage)",g:["graph","line","chart","shows","illustrates","percentage","figures","generation","electricity"]},{n:"tren turun (fell, decline, dropped)",g:["fell","fall","decline","declined","dropped","drop","decreased","decrease","fallen","downward"]},{n:"tren naik (rose, increased, grew)",g:["rose","rise","increased","increase","grew","growth","climbed","risen","upward"]},{n:"batu bara dan terbarukan (coal, renewables)",g:["coal","renewables","renewable","sources","energy","gas"]},{n:"melewati (overtook, surpassed)",g:["overtook","overtaken","surpassed","exceeded","overtake","surpass","higher","crossed"]},{n:"stabil (remained, stable, constant)",g:["remained","stable","constant","unchanged","steady","stayed","stay","fluctuated"]}],
  model:["The line graph shows how much electricity came from coal, renewables and gas between 2000 and 2020. Overall, coal fell steadily while renewables rose sharply, and gas remained almost stable. Coal dropped from 60% to 20%, whereas renewables climbed from 5% to 50% and overtook coal around 2015.","Between 2000 and 2020, the share of coal declined from 60% to 20%, while the share of renewable energy increased from 5% to 50%. Gas stayed constant at 35% for most of the period before falling slightly to 30%. Overall, renewable energy became the main source of electricity by the end of the period."],
  svg:lineSvg },
{ id:"p19", lv:5, title:"Pie chart: family spending", need:3, minw:8,
  desc:"IELTS Task 1 pie chart: how a family spends its monthly income. Housing 35%, Food 25%, Transport 15%, Education 10%, Entertainment 10%, Savings 5%.",
  hint:"Tulis ringkasan Task 1 (3 sampai 4 kalimat): bagian terbesar, bagian terkecil, dan perbandingannya.",
  keys:[{n:"jenis grafik (pie chart, proportion)",g:["pie","chart","proportion","percentage","shows","illustrates","spends","spending","income","expenditure"]},{n:"bagian terbesar (largest, housing)",g:["largest","biggest","most","highest","greatest","housing","accounts","account"]},{n:"bagian terkecil (smallest, savings)",g:["smallest","least","lowest","savings","lowest","minority"]},{n:"proporsi (a quarter, a third, 25%)",g:["quarter","third","half","percent","25","35","majority","fifth","tenth","combined","together"]},{n:"perbandingan (more than, twice)",g:["more","twice","than","compared","whereas","while","less","fewer","same","equal"]}],
  model:["The pie chart shows how a family divides its monthly income. Housing is the largest item, taking 35%, followed by food at 25%. Transport accounts for 15%, whereas education and entertainment each take 10%. Savings are the smallest part of the budget, at only 5%.","Overall, the family spends more than half of its income on housing and food combined. By contrast, only 5% goes into savings, which is half as much as the family spends on education. Transport and entertainment together make up a quarter of the budget."],
  svg:pieSvg },
{ id:"p20", lv:5, title:"Process: recycling bottles", need:4, minw:8,
  desc:"IELTS Task 1 process diagram: recycling plastic bottles in five stages. 1 Bottles are collected. 2 Plastic is sorted. 3 Bottles are cleaned. 4 Plastic is melted. 5 New products are made (clothes, bags, new bottles).",
  hint:"Tulis ringkasan proses (4 sampai 5 kalimat). Pakai kata urutan (first, then, next, finally) dan kalimat pasif (is collected).",
  keys:[{n:"pembuka proses (process, stages, diagram)",g:["process","stages","stage","steps","step","diagram","shows","illustrates","involves","recycled","recycling"]},{n:"kata urutan (first, then, next, finally)",g:["first","firstly","then","next","after","afterwards","finally","subsequently","following","lastly","once"]},{n:"kata kerja pasif (collected, sorted)",g:["collected","sorted","cleaned","washed","melted","made","produced","turned","transformed","separated"]},{n:"tahap akhir (new products, final)",g:["final","finally","products","product","clothes","bags","bottles","end","result"]}],
  model:["The diagram illustrates how plastic bottles are recycled. The process has five main stages from start to finish. First, the bottles are collected, and then the plastic is sorted. Next, the bottles are cleaned before the plastic is melted. Finally, the melted plastic is used to make new products such as clothes and bags.","There are five stages in the recycling of plastic bottles. First, the bottles are collected and sorted by type. After that, they are cleaned and the plastic is melted. In the last stage, new products are made from the melted plastic."],
  svg:processSvg }
);
})();
