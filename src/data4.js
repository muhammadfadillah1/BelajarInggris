// ===== TAMBAHAN KONTEN =====
// --- kosakata tambahan ---
V[1].push(
["night","malam","n","I work at night.","Saya bekerja pada malam hari.","u"],
["clean","bersih; membersihkan","adj","Keep the area clean.","Jaga agar areanya tetap bersih.","k"],
["dirty","kotor","adj","The filter is dirty.","Filternya kotor.","k"],
["fast","cepat","adj","The fan runs very fast.","Kipasnya berputar sangat cepat.","k"],
["slow","lambat; pelan","adj","The flow is too slow.","Alirannya terlalu lambat.","k"],
["wait","menunggu","v","Please wait here.","Tolong tunggu di sini.","u"],
["call","menelepon; memanggil","v","Call the supervisor now.","Telepon supervisor sekarang.","k","Call"],
["engineer","insinyur","n","My brother is an engineer.","Kakak saya seorang insinyur.","k"],
["lunch","makan siang","n","Lunch is at noon.","Makan siang pukul dua belas.","u","Lunch"],
["glove","sarung tangan","n","Wear your gloves.","Pakai sarung tanganmu.","k","gloves"]
);
V[2].push(
["gauge","alat ukur","n","Read the gauge every hour.","Baca alat ukurnya setiap jam.","k"],
["oil","oli; minyak","n","Add some oil to the pump.","Tambahkan sedikit oli ke pompa.","k"],
["fan","kipas","n","The fan is very noisy.","Kipasnya sangat bising.","k"],
["pipe","pipa","n","Water flows through this pipe.","Air mengalir melalui pipa ini.","k"],
["warning","peringatan","n","Read the warning sign.","Baca tanda peringatan itu.","k"],
["alarm","alarm","n","The alarm rang at midnight.","Alarmnya berbunyi tengah malam.","k"],
["tank","tangki","n","The water tank is on the roof.","Tangki air ada di atap.","k"],
["empty","kosong","adj","The tank is almost empty.","Tangkinya hampir kosong.","k"],
["delivery","pengiriman","n","The delivery arrives on Friday.","Pengirimannya tiba hari Jumat.","u"],
["borrow","meminjam","v","Can I borrow your wrench?","Boleh saya pinjam kunci inggrismu?","u"]
);
V[3].push(
["monitor","memantau","v","Operators monitor the pressure all day.","Operator memantau tekanan sepanjang hari.","k"],
["maintain","merawat; mempertahankan","v","We maintain the pumps every month.","Kami merawat pompa-pompa setiap bulan.","k"],
["capacity","kapasitas","n","The tank has a capacity of ten tons.","Tangki itu berkapasitas sepuluh ton.","k"],
["accurate","akurat","adj","Is this reading accurate?","Apakah pembacaan ini akurat?","k"],
["damage","kerusakan; merusak","n","The storm caused serious damage.","Badai itu menyebabkan kerusakan serius.","u"],
["warn","memperingatkan","v","The alarm warns us of danger.","Alarm itu memperingatkan kita akan bahaya.","k","warns"],
["avoid","menghindari","v","Avoid touching the hot surface.","Hindari menyentuh permukaan yang panas.","k","Avoid"],
["receive","menerima","v","We received the spare parts yesterday.","Kami menerima suku cadang itu kemarin.","k","received"],
["tight","ketat; sempit","adj","The schedule is very tight this week.","Jadwalnya sangat ketat minggu ini.","u"],
["advice","saran","n","Thank you for your advice.","Terima kasih atas sarannya.","u"]
);
V[4].push(
["comply","mematuhi","v","All contractors must comply with the safety rules.","Semua kontraktor wajib mematuhi aturan keselamatan.","k"],
["analyze","menganalisis","v","The engineers analyzed the data carefully.","Para insinyur menganalisis datanya dengan teliti.","k","analyzed"],
["significant","signifikan; berarti","adj","There was a significant drop in pressure.","Terjadi penurunan tekanan yang signifikan.","k"],
["temporary","sementara","adj","This is only a temporary solution.","Ini hanya solusi sementara.","k"],
["accountable","dapat dimintai pertanggungjawaban","adj","Managers are accountable for their teams.","Para manajer harus bertanggung jawab atas timnya.","u"],
["obsolete","usang; tidak terpakai lagi","adj","The old control system is obsolete.","Sistem kontrol lama itu sudah usang.","k"],
["overdue","terlambat (melewati tenggat)","adj","The maintenance is two weeks overdue.","Perawatannya terlambat dua minggu.","k"],
["fluctuate","naik turun; berfluktuasi","v","The pressure fluctuates during the day.","Tekanannya naik turun sepanjang hari.","k","fluctuates"],
["thorough","teliti; menyeluruh","adj","We need a thorough inspection.","Kita butuh inspeksi yang teliti.","k"],
["precaution","tindakan pencegahan","n","Take every precaution before entering the tank.","Ambil setiap tindakan pencegahan sebelum masuk ke tangki.","k"]
);

// --- soal grammar tambahan (6 per materi) ---
const GX = {
g1:[["My brother ___ an engineer.",["am","is","are","be"],1],["You ___ late again.",["is","am","are","be"],2],["The gauges ___ broken.",["is","are","am","be"],1],["___ you tired after the shift?",["Is","Are","Am","Be"],1],["I ___ not sure about this step.",["am","is","are","not"],0],["Today ___ Monday.",["am","is","are","be"],1]],
g2:[["The shift ___ at seven every day.",["start","starts","starting","started"],1],["I ___ not work on Sundays.",["do","does","am","is"],0],["What time ___ the meeting start?",["do","does","is","are"],1],["My friends ___ in the control room.",["works","work","working","is work"],1],["She never ___ late.",["is come","comes","come","coming"],1],["Water ___ at 100 degrees.",["boil","boils","boiling","boiled"],1]],
g3:[["I need ___ new helmet.",["a","an","two","many"],0],["She has ___ idea.",["a","an","two","many"],1],["Close ___ door, please. It is cold.",["a","an","the","two"],2],["___ sun rises in the east.",["A","An","The","Some"],2],["He drinks ___ cup of tea every morning.",["a","an","two","many"],0],["We have a meeting at nine. ___ meeting is about safety.",["A","An","The","Some"],2]],
g4:[["There ___ a lot of noise today.",["is","are","have","has"],0],["There ___ five engineers in the room.",["is","are","have","has"],1],["___ there a problem?",["Are","Is","Do","Does"],1],["There ___ any spare parts in the store.",["isn't","aren't","hasn't","doesn't"],1],["___ there any questions?",["Is","Are","Does","Do"],1],["There ___ no water in the tank.",["are","is","have","has"],1]],
g5:[["The engineers ___ the boiler now.",["inspect","inspects","are inspecting","inspected"],2],["He ___ on the phone at the moment.",["talks","is talking","talk","talked"],1],["I ___ for the bus.",["wait","am waiting","waits","waiting"],1],["We ___ not using the old pump.",["is","are","am","do"],1],["What ___ you doing?",["do","are","is","does"],1],["It ___ raining, so take an umbrella.",["is","are","does","has"],0]],
g6:[["The pump ___ down last night.",["break","breaks","broke","broken"],2],["We ___ the report on Monday.",["send","sent","sends","sending"],1],["Did she ___ the logbook?",["sign","signed","signs","signing"],0],["I ___ not hear the alarm last night.",["do","did","does","am"],1],["He ___ his helmet on and went to work.",["put","puts","putted","putting"],0],["They ___ at the plant at six yesterday.",["arrive","arrives","arrived","arriving"],2]],
g7:[["This valve is ___ than that one.",["small","smaller","smallest","more small"],1],["She is the ___ operator in our team.",["more experienced","most experienced","experiencedest","much experienced"],1],["Today is ___ than yesterday.",["hot","hotter","hottest","more hot"],1],["Pump A is ___ expensive than Pump B.",["more","most","much","many"],0],["This is the ___ day of the year.",["long","longer","longest","most long"],2],["Your English is ___ now. Keep going!",["good","better","best","gooder"],1]],
g8:[["Don't worry. I ___ help you.",["will","going to","am go","to"],0],["She ___ going to start a new job next month.",["is","will","does","do"],0],["I ___ not forget the permit.",["will","am will","going","go"],0],["They ___ going to install a new filter.",["is","are","will","do"],1],["It ___ be a busy day tomorrow.",["will","is going","going","to"],0],["___ you help me with this report?",["Will","Are","Is","Be"],0]],
g9:[["I ___ never seen this error before.",["has","have","did","am"],1],["She ___ lived here since 2019.",["have","has","did","is"],1],["The unit ___ just stopped.",["have","has","did","is"],1],["How long ___ you worked here?",["did","have","has","are"],1],["We have ___ the filter. It is clean now.",["replace","replaced","replacing","replaces"],1],["Have they finished the job ___?",["yet","since","ago","for"],0]],
g10:[["You ___ not smoke in the plant.",["must","have","has","don't"],0],["___ I open the window?",["May","Have","Has","Does"],0],["We ___ finish the report today. The deadline is today.",["must","may","don't have to","shouldn't"],0],["You ___ wear gloves, but it is a good idea.",["must","have to","don't have to","mustn't"],2],["I ___ speak English, but I am still learning.",["can","must","should","may not"],0],["Workers ___ to report accidents immediately.",["have","has","must","can"],0]],
g11:[["The pumps ___ checked every day.",["is","are","was","be"],1],["The alarm ___ heard by everyone last night.",["is","was","were","be"],1],["Oil ___ added to the tank every week.",["is","are","were","be"],0],["The old filters ___ replaced yesterday.",["was","were","are","is"],1],["The report must be ___ by Friday.",["send","sent","sending","sends"],1],["Safety rules ___ explained to all new staff.",["is","are","been","be"],1]],
g12:[["If you ___ the button, the machine stops.",["press","will press","pressed","pressing"],0],["If the temperature rises, the alarm ___.",["sounds","sounded","sounding","sound"],0],["If we finish early, we ___ go home.",["will","would","did","are"],0],["I ___ call you if there is a problem.",["will","would","did","am"],0],["If it ___ tomorrow, we will not work outside.",["rains","will rain","rained","raining"],0],["If you don't wear a helmet, you ___ get hurt.",["will","would","did","are"],0]],
g13:[["She said, \"I work here.\" → She said she ___ there.",["works","worked","work","working"],1],["He said, \"We are late.\" → He said they ___ late.",["are","were","was","have been"],1],["He asked, \"Can you help?\" → He asked if I ___ help.",["can","could","would","did"],1],["She said, \"I didn't see it.\" → She said she ___ seen it.",["didn't","hadn't","hasn't","wasn't"],1],["They said, \"We will start tomorrow.\" → They said they ___ start the next day.",["will","would","did","can"],1],["He asked, \"Where is the valve?\" → He asked where the valve ___.",["is","was","were","be"],1]],
g14:[["If I ___ you, I would stop the pump.",["am","was","were","be"],2],["If we had enough time, we ___ check all the valves.",["will","would","had","are"],1],["If the sensor had worked, the alarm ___ rung.",["would","would have","will have","had"],1],["She would ___ the job if she had more experience.",["gets","get","got","getting"],1],["If they hadn't stopped the pump, the damage ___ been worse.",["would","would have","will have","had"],1],["What would you do if you ___ the manager?",["are","were","will be","be"],1]],
g15:[["The operator ___ found the leak is here.",["who","which","whose","where"],0],["This is the pump ___ makes a loud noise.",["who","which","whose","where"],1],["The man ___ helmet is red is my boss.",["who","which","whose","where"],2],["The room ___ we keep the tools is locked.",["where","who","whose","what"],0],["The report, ___ was long, was clear.",["that","which","who","whose"],1],["She is the engineer ___ I told you about.",["whose","who","which","where"],1]],
g16:[["He worked late; ___, he finished on time.",["therefore","although","because of","despite"],0],["___ the rain, we continued the inspection.",["Because","Although","Despite","However"],2],["The unit stopped ___ a power cut.",["because","because of","although","however"],1],["The plan is good. ___, it is expensive.",["Because","However","Although","So"],1],["___ it was cold, he wore only a shirt.",["Because","Although","Therefore","Despite"],1],["The pump was old, ___ we replaced it.",["so","although","however","despite"],0]]
};
G.forEach(g=>{ if(GX[g.id]) GX[g.id].forEach(x=>g.latihan.push(x)); });

// --- cerita tambahan ---
S.push(
{ id:"s9", lv:1, title:"My Family",
  text:"I have a small family. My father is a driver and my mother is a teacher. I have one sister. Her name is Dewi. She is a student. On Sunday, we eat dinner together at home. My mother cooks rice and fish. After dinner, my sister and I wash the dishes. I love my family.",
  q:[
    ["What does the speaker's father do?",["He is a driver","He is a teacher","He is a student","He is an engineer"],0],
    ["How many sisters does the speaker have?",["One","Two","Three","None"],0],
    ["When does the family eat dinner together?",["On Sunday","On Monday","Every morning","On Friday"],0],
    ["Who cooks rice and fish?",["The mother","The father","Dewi","The speaker"],0]
  ]},
{ id:"s10", lv:2, title:"A Late Delivery",
  text:"Yesterday, the delivery truck was late. The driver called the warehouse and said that there was a lot of traffic. The supervisor was angry because the team needed the new gauges for the morning repair. Finally, the truck arrived at two o'clock. The workers checked the boxes quickly, but one gauge was broken. The supervisor wrote a message to the supplier and asked for a replacement. The supplier answered that it would send a new gauge on Friday.",
  q:[
    ["Why was the truck late?",["There was a lot of traffic","The engine was broken","The weather was bad","The address was wrong"],0],
    ["What time did the truck arrive?",["Two o'clock","Ten o'clock","Noon","Five o'clock"],0],
    ["What was wrong with one gauge?",["It was broken","It was dirty","It was the wrong size","It was missing"],0],
    ["When will the new gauge arrive?",["On Friday","Tomorrow","Next month","Today"],0]
  ]},
{ id:"s11", lv:3, title:"Reducing Noise",
  text:"The plant has received several complaints about noise from the neighbouring village. To solve the problem, the management decided to install sound barriers around the cooling fans. Engineers first measured the noise level at different times of the day, because it increases at night when the units run at full capacity. After the barriers were installed, the noise was reduced by almost half. However, the team still monitors the level every week, as they want to maintain good relations with the community.",
  q:[
    ["Why did the plant install sound barriers?",["Residents complained about the noise","The fans were broken","A new law required it","The units were too old"],0],
    ["When is the noise higher?",["At night","In the morning","At noon","On Sundays"],0],
    ["What happened after the barriers were installed?",["The noise dropped by almost half","The noise stopped completely","The noise increased","Nothing changed"],0],
    ["Why does the team still monitor the level?",["To keep good relations with the community","Because the barriers are broken","Because the law says so","To save energy"],0]
  ]},
{ id:"s12", lv:4, title:"An Efficiency Review",
  text:"Last quarter, the management commissioned a thorough review of boiler efficiency. The analysis revealed that coal consumption fluctuated significantly between shifts, even though the load remained constant. Had the operators been given clearer guidelines, the variation might have been avoided. Consequently, the plant introduced a standard operating procedure and a monthly report, for which each shift supervisor is accountable. Within three months, the difference between shifts narrowed to less than one percent. Nevertheless, the engineers caution that this is only a first step and that further improvement will require sustained effort.",
  q:[
    ["What did the analysis reveal?",["Coal consumption varied between shifts","The load kept changing","The boilers were obsolete","Operators ignored the alarms"],0],
    ["Who is accountable for the monthly report?",["Each shift supervisor","The plant manager","The engineers","The supplier"],0],
    ["What happened within three months?",["The difference between shifts fell below one percent","Consumption doubled","The review was cancelled","The boilers were replaced"],0],
    ["What do the engineers say about the result?",["It is only a first step","It is the final solution","It was a failure","No more effort is needed"],0]
  ]}
);

// --- situasi dengar tambahan ---
L.push(
{lv:1,s:"Turn off the light and close the door.",q:"Apa yang harus dilakukan?",o:["Mematikan lampu dan menutup pintu","Menyalakan lampu dan membuka pintu","Menutup katup dan menelepon","Menunggu di kantor"],a:0},
{lv:1,s:"My shift starts at eight tonight.",q:"Kapan shift pembicara dimulai?",o:["Pukul delapan malam ini","Pukul delapan pagi","Pukul tujuh malam","Besok pukul delapan"],a:0},
{lv:1,s:"The water is hot. Please wait.",q:"Kenapa disuruh menunggu?",o:["Karena airnya panas","Karena airnya dingin","Karena pompanya rusak","Karena kantor tutup"],a:0},
{lv:1,s:"I need a new helmet and two gloves.",q:"Apa yang dibutuhkan pembicara?",o:["Helm baru dan dua sarung tangan","Dua helm dan satu sarung tangan","Sepatu baru","Alat baru"],a:0},
{lv:2,s:"The tank is almost empty, so please order more oil.",q:"Apa yang harus dilakukan?",o:["Memesan lebih banyak oli","Mengosongkan tangki","Memperbaiki kipas","Menelepon supplier air"],a:0},
{lv:2,s:"The alarm rang twice, but there was no fire.",q:"Apa yang terjadi?",o:["Alarm berbunyi dua kali, tetapi tidak ada kebakaran","Ada kebakaran kecil","Alarmnya rusak total","Alarmnya tidak berbunyi"],a:0},
{lv:2,s:"Can I borrow your wrench for ten minutes?",q:"Apa yang diminta pembicara?",o:["Meminjam kunci inggris selama sepuluh menit","Membeli kunci inggris","Memperbaiki kunci inggris","Mengembalikan kunci inggris"],a:0},
{lv:2,s:"The delivery will arrive on Friday afternoon.",q:"Kapan pengiriman akan tiba?",o:["Jumat sore","Jumat pagi","Kamis sore","Sabtu pagi"],a:0},
{lv:3,s:"Please monitor the pressure and avoid touching the valve until the supervisor arrives.",q:"What should you avoid?",o:["Touching the valve","Monitoring the pressure","Calling the supervisor","Reading the gauge"],a:0},
{lv:3,s:"We received the spare parts yesterday, so the repair can start tomorrow.",q:"When can the repair start?",o:["Tomorrow","Yesterday","Today","Next week"],a:0},
{lv:3,s:"The reading is not accurate, so we need to adjust the sensor.",q:"What is the problem?",o:["The reading is inaccurate","The sensor is missing","The pressure is too low","The alarm is broken"],a:0},
{lv:3,s:"I have a suggestion: we should organize a short briefing before every shift.",q:"What does the speaker suggest?",o:["A short briefing before every shift","A longer shift","Cancelling the meeting","Buying new equipment"],a:0},
{lv:4,s:"The pressure fluctuated significantly, hence the decision to shut down the unit.",q:"Why was the unit shut down?",o:["Because of significant pressure fluctuations","Because of a power cut","Because of a coal shortage","Because of a scheduled inspection"],a:0},
{lv:4,s:"The maintenance is two weeks overdue, and the management is accountable for the delay.",q:"Who is accountable for the delay?",o:["The management","The contractors","The operators","The supplier"],a:0},
{lv:4,s:"This is only a temporary solution; a thorough inspection will be carried out next month.",q:"What will happen next month?",o:["A thorough inspection","A temporary repair","A shutdown","A new procedure"],a:0},
{lv:4,s:"Had they taken every precaution, the accident would not have occurred.",q:"What does this mean?",o:["They did not take every precaution, so the accident happened","They took every precaution and nothing happened","The accident was unavoidable","They will take precautions next time"],a:0}
);

// --- isi kotak tambahan ---
// t:"g" = grammar. {jawaban|pengecoh1|pengecoh2} = pilihan per kotak. {kata} = ambil dari bank kata.
C.forEach(c=>{ c.t = c.t || "v"; });
C.push(
{ id:"c9", lv:1, t:"v", title:"The Night Shift",
  text:"I work the night {shift} at the plant. I wear {gloves} and a helmet. My {friend} Budi and I {check} the pump every hour. It is {cold} outside, so we drink hot coffee.",
  x:["door","tomorrow"]},
{ id:"c10", lv:2, t:"v", title:"Reading the Gauge",
  text:"The operator reads the {gauge} every hour. Today the reading is {normal}, so he writes a short {report}. If there is a {leak}, the team will {repair} it.",
  x:["airport","ticket"]},
{ id:"c11", lv:3, t:"v", title:"Equipment Check",
  text:"Before using any {equipment}, the technician must {inspect} it for damage. He should {adjust} the settings and then follow the {procedure}. Any {hazard} must be reported.",
  x:["complain","deadline"]},
{ id:"c12", lv:4, t:"v", title:"Project Update",
  text:"Dear all, regarding the {delay}, the team will {investigate} the cause. Please keep the records {consistent} and {acknowledge} this message by Friday. The {outcome} will be shared next week.",
  x:["mitigate","assume"]},

{ id:"cg1", lv:1, t:"g", title:"My Morning",
  text:"My name {is|am|are} Rina. I {work|works|working} at a power plant. I {have|has|am} a small family. My brother {is|are|am} an engineer, and my parents {live|lives|living} in a small town. Every day, I {wake|wakes|waking} up at six."},
{ id:"cg2", lv:1, t:"g", title:"At the Office",
  text:"There {is|are|have} a big table in the office. The tools {are|is|am} on the table. {The|An|These} boss is in the control room. He {drinks|drink|drinking} coffee every morning. {An|Many|These} engineer is waiting for him."},
{ id:"cg3", lv:1, t:"g", title:"A Hot Saturday",
  text:"Today {is|are|am} Saturday. It {is|are|am} very hot, so we {are|is|am} not working outside. My friends {are|is|am} at the beach. I {am|is|are} tired, so I {stay|stays|staying} at home."},
{ id:"cg4", lv:2, t:"g", title:"A Busy Morning",
  text:"This morning, the supervisor {came|come|comes} to the plant early. The engineers {are checking|check|checked} the boiler right now. Yesterday, they {found|find|finds} a small leak, so they {are repairing|repair|repaired} it at the moment. The new pump is {bigger|big|biggest} than the old one, and it is {more|most|much} reliable. They {are going to|will to|going} test it tomorrow."},
{ id:"cg5", lv:2, t:"g", title:"Last Weekend",
  text:"Last weekend, my family and I {went|go|goes} to Tarakan. We {took|take|taken} a plane at six in the morning. The weather {was|is|were} hot, so we {didn't|don't|doesn't} walk much. My sister {bought|buy|buys} a ticket for the museum, but I {didn't|don't|wasn't} go inside. Next week, we {will|are|did} visit my uncle."},
{ id:"cg6", lv:2, t:"g", title:"Comparing Pumps",
  text:"Pump A is {older|old|oldest} than Pump B. Pump C is the {newest|newer|more new} pump in the plant. Pump B is {more|most|much} expensive than Pump A, but it is {better|good|best} for heavy work. I think we {will|are|did} buy Pump B. The manager {is going|will|goes} to decide tomorrow."},
{ id:"cg7", lv:3, t:"g", title:"Plant Rules",
  text:"All workers {must|may|don't have to} wear a helmet in the plant. You {mustn't|don't have to|should} smoke near the fuel tank, because it is dangerous. The equipment {is|are|was} checked every morning, and the reports {are|is|was} signed by the supervisor. If a worker {sees|will see|saw} a hazard, he {will|would|did} report it immediately. We {have worked|worked|work} together since 2020, so we know the rules well."},
{ id:"cg8", lv:3, t:"g", title:"The Late Report",
  text:"Sari {has|have|had} already finished her part of the report. She {has been|was|is} here since seven o'clock. Although the deadline {is|are|were} tight, she {has not|did not|does not} asked for help. If she {finishes|will finish|finishing} early, we {will|would|did} send the report today. The report {will be|was|were} sent to the client tomorrow."},
{ id:"cg9", lv:3, t:"g", title:"Fixing the Filter",
  text:"The old filter {was|is|were} replaced last week. The new filter {was|were|are} installed by the maintenance team yesterday. We {have|has|are} just checked it, and it {works|work|working} well. If the pressure {rises|will rise|rose}, the alarm {sounds|sounded|sounding}. You {should|mustn't|can't} check the filter every month."},
{ id:"cg10", lv:4, t:"g", title:"Reported Instructions",
  text:"Yesterday, the manager said that the unit {would|will|can} be shut down at midnight. He told us that we {had|have|has} to verify all readings first. I asked him whether the spare pump {was|is|were} ready, and he said it {had been|has been|will be} tested the week before."},
{ id:"cg11", lv:4, t:"g", title:"After the Failure",
  text:"{Had|Have|Has} we replaced the seal earlier, the failure {would have|would|will have} been prevented. The engineer {who|which|whose} investigated the case wrote a report {that|who|whose} was very detailed. The pump, {which|who|whose} was installed in 2015, is now obsolete. If I {were|am|will be} the manager, I {would|will|did} replace it immediately. {Although|Because|However} it is expensive, it is necessary."},
{ id:"cg12", lv:4, t:"g", title:"A Formal Email",
  text:"Dear Mr. Hartono, I am writing {regarding|about to|regard} the delay. {Although|Despite|Therefore} the shortage was beyond our control, we apologize for the inconvenience. The parts {were|was|have} ordered on 3 November, {but|because|so} they have not arrived yet. {Despite|Although|Because} the delay, we have {managed|manage|managing} to keep the schedule. Could you please confirm if a partial delivery {is|will|has} possible? We would appreciate it {if|to|so} you could reply by Friday."}
);
