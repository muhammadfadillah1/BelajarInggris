// ===== CERITA (BACA + DENGAR) =====
// q: [pertanyaan, [pilihan], indeks benar]
const S = [
{ id:"s1", lv:1, title:"A Day at the Plant",
  text:"My name is Rina. I work at a power plant. My shift starts at seven in the morning. First, I wear my helmet and safety shoes. Then I check the pump and the valves. It is hot in the boiler room, so I drink a lot of water. At noon, I eat lunch with my friend Budi. In the afternoon, I write a report for my boss. I go home at four. I am very tired, but I am happy.",
  q:[
    ["What time does Rina's shift start?",["Seven in the morning","Four in the afternoon","Noon","Eight at night"],0],
    ["Why does Rina drink a lot of water?",["Because it is hot in the boiler room","Because she is tired","Because she is sick","Because lunch is late"],0],
    ["Who does Rina eat lunch with?",["Her boss","Her friend Budi","Her family","Nobody"],1],
    ["What does Rina do in the afternoon?",["She checks the valves","She writes a report","She goes shopping","She eats lunch"],1]
  ]},
{ id:"s2", lv:1, title:"At the Shop",
  text:"Today I go to the shop near my house. I need water, rice, and a notebook. The water is cold. The bag of rice is big. The notebook is small and blue. The woman at the shop is very nice. She says, \"Good morning! Can I help you?\" I say, \"Yes, please. How much is this?\" The notebook is ten thousand rupiah. I buy three things and I go home.",
  q:[
    ["What does the speaker need?",["Water, rice, and a notebook","Water, a pen, and a bag","Rice and a book","Coffee and rice"],0],
    ["What color is the notebook?",["Red","Blue","Green","White"],1],
    ["How is the woman at the shop?",["Very nice","Very tired","Very angry","Very busy"],0],
    ["How much is the notebook?",["Ten thousand rupiah","Five thousand rupiah","Twenty thousand rupiah","It is free"],0]
  ]},
{ id:"s3", lv:2, title:"A Noisy Pump",
  text:"On Monday morning, Andi was checking Pump 2 when he heard a loud noise. He stopped the pump and told his supervisor. The supervisor usually asks for a written report, so Andi wrote down the time, the pressure, and the temperature. The pressure was normal, but the temperature was higher than usual. The maintenance team came at ten o'clock. They found a small leak near the seal. Fortunately, there was a spare pump in the store, so the repair was quick. By noon, everything was normal again.",
  q:[
    ["What did Andi do right after he heard the noise?",["He stopped the pump","He replaced the seal","He went home","He ignored it"],0],
    ["Which reading was higher than usual?",["The temperature","The pressure","The water level","The voltage"],0],
    ["Where was the leak?",["Near the seal","In the store","Near the supervisor's office","On the spare pump"],0],
    ["Why was the repair quick?",["There was a spare pump in the store","The leak was big","Andi repaired it alone","The supervisor helped"],0]
  ]},
{ id:"s4", lv:2, title:"Weekend Plans",
  text:"This weekend, I am going to travel to Tarakan with my family. Our flight leaves at six on Saturday morning, so we must wake up very early. My sister is bringing the tickets. I am packing the bags tonight. The weather is usually hot there, but my mother says it is going to rain on Sunday. Therefore, we are going to visit the museum on Sunday. I forget things easily, so I made a list. I hope the trip is easy and fun.",
  q:[
    ["When does the flight leave?",["Saturday at six in the morning","Sunday at six in the evening","Saturday at noon","Friday at midnight"],0],
    ["Who is bringing the tickets?",["The speaker's sister","The speaker's mother","The speaker","The speaker's father"],0],
    ["Why will they visit the museum on Sunday?",["Because it is going to rain","Because it is hot","Because the flight is late","Because the museum is free"],0],
    ["Why did the speaker make a list?",["The speaker forgets things easily","The trip is difficult","The bags are small","The tickets are lost"],0]
  ]},
{ id:"s5", lv:3, title:"The Safety Briefing",
  text:"Every Monday, all staff must attend a safety briefing before the shift starts. Last week, the supervisor explained a new procedure for hot work. Before any hot work begins, the team has to obtain a permit and check that all equipment is in good condition. Although the procedure takes an extra twenty minutes, it has already prevented two accidents this year. The supervisor also suggested that workers report any hazard immediately, even a small one. Some workers complained that the briefing is too long, but most agree that it has improved safety across the plant.",
  q:[
    ["What must the team do before hot work begins?",["Get a permit and check the equipment","Attend a long meeting","Replace the equipment","Call the manager"],0],
    ["What has the new procedure done this year?",["Prevented two accidents","Caused two delays","Saved twenty minutes","Reduced the staff"],0],
    ["What did the supervisor suggest?",["Report any hazard immediately","Ignore small hazards","Shorten the shift","Cancel hot work"],0],
    ["How do most workers feel about the briefing?",["They agree it improves safety","They think it is useless","They want to stop it","They never attend"],0]
  ]},
{ id:"s6", lv:3, title:"A New Colleague",
  text:"Last month, a new colleague named Sari joined our team. She has three years of experience in a chemical plant, so she learns quickly. In her first week, she was shown how the water treatment system works, and she was asked to inspect the filters every morning. At first, she was nervous because the instructions were in two languages. However, her supervisor was available whenever she had a question. If she keeps working like this, she will probably be promoted next year. Everyone is happy that she decided to join us.",
  q:[
    ["How much experience does Sari have?",["Three years","One year","Ten years","None"],0],
    ["What was Sari asked to do every morning?",["Inspect the filters","Write the monthly report","Train new staff","Replace the pumps"],0],
    ["Why was Sari nervous at first?",["The instructions were in two languages","Her supervisor was away","The work was boring","She was late"],0],
    ["What might happen next year if she keeps working well?",["She will probably be promoted","She will leave","She will be fired","She will move house"],0]
  ]},
{ id:"s7", lv:4, title:"Investigating a Unit Trip",
  text:"Regarding last Tuesday's unit trip, the investigation team has submitted a comprehensive report. According to the findings, the failure was triggered by a faulty level sensor, and the operator, who had assumed that the reading was accurate, did not verify it manually. Had the sensor been replaced during the last maintenance, the trip would have been prevented. The report emphasizes that this was not an isolated deviation: similar readings had been ignored twice before. As a result, the plant will implement a mandatory verification step and will anticipate sensor failures by replacing critical sensors on a fixed schedule. The estimated cost is moderate, whereas the cost of another trip would be considerable.",
  q:[
    ["What triggered the trip?",["A faulty level sensor","A power cut","An operator strike","A broken pump"],0],
    ["What mistake did the operator make?",["He assumed the reading was accurate and did not verify it","He ignored a phone call","He left the plant","He replaced the sensor"],0],
    ["What will the plant implement?",["A mandatory verification step","A new boiler","A longer shift","A smaller team"],0],
    ["What does the last sentence suggest?",["Prevention is cheaper than another trip","Another trip would be cheap","The cost is unknown","No action is needed"],0]
  ]},
{ id:"s8", lv:4, title:"Email: Delay in Delivery",
  text:"Dear Mr. Hartono, I am writing regarding the delay in delivery of the spare parts that we ordered on 3 November. Due to a shortage of raw materials, your supplier has informed us that the shipment will arrive two weeks later than estimated. We understand that circumstances are sometimes beyond anyone's control; however, this delay is affecting our maintenance schedule, which is our highest priority. Could you please acknowledge this email and confirm whether a partial delivery is possible? If so, we would prioritize the pump seals, as they are urgent. We would appreciate a reply by Friday. Kind regards, Maintenance Planning.",
  q:[
    ["Why is the shipment delayed?",["A shortage of raw materials","Bad weather","A strike","A mistake in the order"],0],
    ["How late will the shipment be?",["Two weeks later than estimated","Two days later","One month later","It will not arrive"],0],
    ["What does the writer ask for?",["To acknowledge the email and confirm partial delivery","To cancel the order","To lower the price","To visit the factory"],0],
    ["Which parts are the most urgent?",["The pump seals","The valves","The filters","The sensors"],0]
  ]}
];

// ===== ISI KOTAK (cloze) =====
// {kata} = bagian kosong. x = pengecoh
const C = [
{ id:"c1", lv:1, title:"My Work",
  text:"Hello, my name is Tono. I {work} at a power plant. Every morning I wear my {helmet} and check the {pump}. Today the water is very {hot}, so I am careful. My {boss} says the problem is small.",
  x:["tired","door"]},
{ id:"c2", lv:1, title:"Sunday at the Market",
  text:"On Sunday, my family and I go to the {market}. It is {cold} today, so I wear a {jacket}. We {buy} fruit there, and then we go {home}.",
  x:["valve","open"]},
{ id:"c3", lv:2, title:"A Small Leak",
  text:"Last week there was a {leak} near Pump 3. The operator {reported} it to the supervisor {because} the {pressure} was dropping. The maintenance team {repaired} it the same day.",
  x:["usually","weather"]},
{ id:"c4", lv:2, title:"Running Late",
  text:"I {usually} arrive at seven, but yesterday I was {late} because of the {weather}. The {meeting} had already started. My boss was not angry, but he said, \"Please {remember} to call next time.\"",
  x:["ticket","airport"]},
{ id:"c5", lv:3, title:"Before You Start",
  text:"Before starting any job, you {must} get a work {permit} and check that the {equipment} is in good condition. If you see a {hazard}, you should {report} it immediately.",
  x:["deadline","experience"]},
{ id:"c6", lv:3, title:"The New Filter",
  text:"The new filter was {installed} yesterday. {Although} it is more expensive, it will {reduce} the cost of maintenance in the long run. The supervisor {suggested} that we {replace} the old filters in the other units too.",
  x:["complained","increase"]},
{ id:"c7", lv:4, title:"After the Delay",
  text:"Regarding the {delay}, the team will {investigate} the cause. All records must be {consistent}, and any {deviation} must be reported. The final findings will be shared in a {comprehensive} report.",
  x:["mitigate","negotiate"]},
{ id:"c8", lv:4, title:"Fire Safety",
  text:"Safety is our first {priority}. To {mitigate} the risk of fire, we will {implement} a {mandatory} inspection every month. Failure to {acknowledge} an alarm can have serious {consequences}.",
  x:["efficiency","assume"]}
];

// ===== LISTENING: SITUASI =====
// s: kalimat yang diucapkan, q: pertanyaan, o: pilihan (benar = indeks a)
const L = [
{lv:1,s:"Please close the valve and wait here.",q:"Apa yang harus kamu lakukan?",o:["Menutup katup dan menunggu di sini","Membuka katup lalu pergi","Memeriksa pompa lalu pulang","Mematikan lampu"],a:0},
{lv:1,s:"The meeting is at nine in the office.",q:"Kapan dan di mana rapatnya?",o:["Pukul sembilan di kantor","Pukul lima di ruang kontrol","Pukul sembilan di lapangan","Pukul sembilan malam di rumah"],a:0},
{lv:1,s:"I am tired. I want to drink some water.",q:"Apa yang diinginkan pembicara?",o:["Minum air","Makan siang","Membeli buku","Naik bus"],a:0},
{lv:1,s:"Your helmet is on the table.",q:"Di mana helmnya?",o:["Di atas meja","Di lantai","Di kantor atasan","Di dalam tas"],a:0},
{lv:1,s:"Today is cold, so wear a jacket.",q:"Kenapa disuruh memakai jaket?",o:["Karena hari ini dingin","Karena hari ini panas","Karena ada rapat","Karena sedang hujan"],a:0},
{lv:1,s:"The pump has a problem. Stop it now.",q:"Apa perintahnya?",o:["Hentikan pompa sekarang","Nyalakan pompa","Beli pompa baru","Tunggu sampai besok"],a:0},
{lv:2,s:"There is a leak near the big pump. Please tell the supervisor.",q:"Apa yang harus dilakukan?",o:["Melapor ke supervisor tentang kebocoran","Memperbaiki pompa sendiri","Mengganti pompa cadangan","Menutup kantor"],a:0},
{lv:2,s:"I usually arrive at seven, but today I was late because the bus broke down.",q:"Kenapa pembicara terlambat?",o:["Busnya mogok","Dia sakit","Hujan deras","Dia lupa jadwal"],a:0},
{lv:2,s:"The oil pressure is normal, but the temperature is high.",q:"Mana yang normal?",o:["Tekanan oli","Suhu","Level air","Kebisingan"],a:0},
{lv:2,s:"Don't forget to sign the logbook before you go home.",q:"Apa yang tidak boleh dilupakan?",o:["Menandatangani buku catatan sebelum pulang","Membawa helm pulang","Menelepon atasan","Mematikan pompa"],a:0},
{lv:2,s:"We have a spare pump in the store, so the repair will be quick.",q:"Kenapa perbaikannya akan cepat?",o:["Ada pompa cadangan di gudang","Kebocorannya kecil","Banyak teknisi hari ini","Cuacanya bagus"],a:0},
{lv:2,s:"My flight to Tarakan leaves at six tomorrow morning.",q:"Kapan penerbangannya?",o:["Besok pukul enam pagi","Hari ini pukul enam sore","Besok pukul sebelas siang","Lusa pagi"],a:0},
{lv:3,s:"Before starting the job, you must get a work permit and check your equipment.",q:"What must you do before starting?",o:["Get a permit and check the equipment","Replace the filter","Attend a meeting","Call the manager"],a:0},
{lv:3,s:"Although the schedule is tight, we decided not to skip the inspection.",q:"What did they decide?",o:["To do the inspection","To skip the inspection","To change the schedule","To cancel the job"],a:0},
{lv:3,s:"The new filter has been installed, but the pressure has not dropped yet.",q:"What is the situation?",o:["The filter is installed, but the pressure is still high","The filter is missing, and the pressure is normal","The filter is broken, and the pressure is low","Nothing has been installed"],a:0},
{lv:3,s:"If the alarm sounds, leave the area immediately and go to the assembly point.",q:"What should you do if the alarm sounds?",o:["Leave and go to the assembly point","Stay and finish the work","Call the supervisor and wait","Turn off the alarm"],a:0},
{lv:3,s:"Could you explain the procedure again? I am not sure about step four.",q:"What does the speaker want?",o:["The procedure explained again","To skip step four","To change the procedure","To end the meeting"],a:0},
{lv:3,s:"The deadline for the report has been moved from Wednesday to Friday.",q:"When is the new deadline?",o:["Friday","Wednesday","Monday","Thursday"],a:0},
{lv:4,s:"Regarding the delay, I would like to emphasize that the shortage of spare parts was beyond our control.",q:"What is the speaker's main point?",o:["A parts shortage the team could not control caused the delay","The team caused the delay","The delay is a minor matter","The parts will arrive tomorrow"],a:0},
{lv:4,s:"Please verify the readings before you acknowledge the alarm, and do not assume the sensor is accurate.",q:"What is the speaker's advice?",o:["Check the readings and do not trust the sensor blindly","Acknowledge the alarm immediately","Replace the sensor","Ignore the alarm"],a:0},
{lv:4,s:"We anticipate a slight increase in consumption next month, so we need a comprehensive plan.",q:"What do they expect?",o:["A small rise in consumption","A big drop in consumption","No change","A shutdown"],a:0},
{lv:4,s:"Had we replaced the gasket earlier, the failure would have been prevented.",q:"What does this mean?",o:["The gasket was not replaced earlier, so the failure happened","The gasket was replaced early and the failure was prevented","They will replace the gasket soon","The gasket is fine"],a:0},
{lv:4,s:"The handover note must be consistent with the log, and any deviation should be reported to the supervisor.",q:"What should be reported?",o:["Any difference between the note and the log","Every shift change","Only major failures","Nothing"],a:0},
{lv:4,s:"She said she would send the estimate by noon, but she has not sent it yet.",q:"What is true?",o:["The estimate has not been sent","The estimate was sent at noon","She refused to send it","She sent it yesterday"],a:0}
];
