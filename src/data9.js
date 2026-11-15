// ===== KOSAKATA MASSAL =====
// Format per baris: kata|arti|jenis|contoh kalimat|bentuk di contoh (kalau beda)
// Baris "#k" / "#u" / "#a" mengganti kategori (kerja / umum / akademik).
function addWords(lv, txt){
  let cat = "u";
  txt.split("\n").forEach(line => {
    line = line.trim();
    if(!line) return;
    if(line.charAt(0) === "#"){ cat = line.slice(1).trim(); return; }
    const p = line.split("|");
    V[lv].push([p[0], p[1], p[2], p[3], "", cat, p[4] || p[0]]);
  });
}

addWords(1, `
#u
man|pria|n|The man is tall.
woman|wanita|n|The woman is a doctor.
child|anak|n|The child is playing.
boy|anak laki-laki|n|The boy has a ball.
girl|anak perempuan|n|The girl is reading a book.
father|ayah|n|My father is at home.
mother|ibu|n|My mother cooks every day.
brother|saudara laki-laki|n|My brother is a student.
sister|saudara perempuan|n|My sister lives in Jakarta.
name|nama|n|What is your name?
home|rumah (tempat tinggal)|n|I go home at five.
room|ruangan; kamar|n|This room is big.
table|meja|n|The book is on the table.
chair|kursi|n|Please sit on the chair.
bed|tempat tidur|n|I go to bed at ten.
window|jendela|n|Please open the window.
book|buku|n|This book is good.
pen|pena|n|Can I use your pen?
phone|telepon|n|My phone is new.
car|mobil|n|He has a red car.
bus|bus|n|The bus is late.
road|jalan|n|The road is wet.
shop|toko|n|The shop is open.
school|sekolah|n|The school is near my house.
city|kota|n|Jakarta is a big city.
rice|nasi; beras|n|We eat rice every day.
fish|ikan|n|I like fish.
chicken|ayam|n|She cooks chicken for dinner.
egg|telur|n|I eat an egg for breakfast.
bread|roti|n|He buys bread in the morning.
tea|teh|n|Would you like some tea?
coffee|kopi|n|I drink coffee at work.
milk|susu|n|The baby drinks milk.
fruit|buah|n|Fruit is good for you.
sugar|gula|n|No sugar, please.
salt|garam|n|Pass the salt, please.
breakfast|sarapan|n|I have breakfast at six.
dinner|makan malam|n|We have dinner at seven.
day|hari|n|Have a nice day.
week|minggu|n|I work five days a week.
month|bulan|n|This month is very hot.
year|tahun|n|Happy new year!
hour|jam (durasi)|n|I wait for one hour.
minute|menit|n|Wait a minute, please.
now|sekarang|adv|I am busy now.
here|di sini|adv|Please come here.
there|di sana|adv|Put the box there.
good|baik; bagus|adj|This is a good idea.
bad|buruk|adj|The weather is bad.
long|panjang; lama|adj|It is a long road.
short|pendek|adj|The meeting is short.
tall|tinggi (orang)|adj|My brother is tall.
young|muda|adj|The new worker is young.
beautiful|indah; cantik|adj|The beach is beautiful.
hungry|lapar|adj|I am hungry.
thirsty|haus|adj|Are you thirsty?
ready|siap|adj|Lunch is ready.
right|kanan; benar|adj|Turn right at the gate.
left|kiri|adj|The office is on the left.
red|merah|adj|Press the red button.
blue|biru|adj|He wears a blue shirt.
green|hijau|adj|The green light is on.
white|putih|adj|The wall is white.
black|hitam|adj|Coal is black.
yellow|kuning|adj|The helmet is yellow.
go|pergi|v|I go to work by bus.
come|datang|v|Please come to my office.
see|melihat|v|I can see the sea.|see
look|memandang; melihat|v|Look at the sign.
listen|mendengarkan|v|Please listen to me.
speak|berbicara|v|I speak a little English.
say|berkata|v|Please say it again.
ask|bertanya; meminta|v|You can ask me.
answer|menjawab; jawaban|v|Please answer the phone.
give|memberi|v|Please give me the key.
take|mengambil|v|Take your helmet.
put|menaruh|v|Put the tools in the box.
make|membuat|v|I make coffee every morning.
like|suka|v|I like my job.
love|mencintai; sangat suka|v|I love my family.
want|ingin|v|I want a cup of tea.
know|tahu|v|I know the answer.
think|berpikir; mengira|v|I think it is true.
live|tinggal|v|I live in Tarakan.
sit|duduk|v|Please sit down.
stand|berdiri|v|Please stand here.
walk|berjalan kaki|v|I walk to the office.
run|berlari|v|Do not run here.
sleep|tidur|v|I sleep eight hours.
cook|memasak|v|I cook dinner at home.
wash|mencuci|v|Wash your hands.
play|bermain|v|The children play outside.
learn|belajar|v|I learn English every day.
teach|mengajar|v|She can teach you.
use|memakai|v|Use this tool.
bring|membawa (ke sini)|v|Bring your ID card.
pay|membayar|v|I pay with cash.
sell|menjual|v|They sell fruit.
turn|berbelok; memutar|v|Turn left here.
push|mendorong|v|Push the door.
pull|menarik|v|Pull the handle.
hold|memegang|v|Hold the ladder, please.
show|menunjukkan|v|Show me your card.
tell|memberi tahu|v|Tell me your name.
meet|bertemu|v|Nice to meet you.
thank|berterima kasih|v|Thank you for your help.
sorry|maaf|adj|I am sorry.
#k
job|pekerjaan|n|I like my job.
worker|pekerja|n|The worker wears a helmet.
driver|sopir|n|The driver is in the truck.
truck|truk|n|The truck is full of coal.
gate|gerbang|n|Wait at the gate.
light|lampu; cahaya|n|Turn on the light.
button|tombol|n|Press the green button.
switch|sakelar|n|The switch is on the wall.
box|kotak|n|The box is heavy.
bag|tas|n|My bag is in the car.
card|kartu|n|Show your ID card.
sign|tanda; rambu|n|Read the sign.
number|nomor; angka|n|What is your phone number?
floor|lantai|n|The floor is wet.
wall|dinding|n|There is a clock on the wall.
roof|atap|n|The roof is new.
stairs|tangga|n|Use the stairs.
fire|api; kebakaran|n|Fire is dangerous.
smoke|asap|n|I see smoke.
coal|batu bara|n|The plant burns coal.
plant|pabrik; pembangkit|n|I work at the plant.
machine|mesin|n|The machine is running.
motor|motor (listrik)|n|The motor is hot.
cable|kabel|n|Do not touch the cable.
power|daya; listrik|n|The power is off.
team|tim|n|We are a good team.
visitor|tamu|n|The visitor is at the gate.
uniform|seragam|n|We wear a uniform.
shoes|sepatu|n|Wear safety shoes.
glasses|kacamata|n|Wear safety glasses.
break|istirahat|n|We have a break at ten.
full|penuh|adj|The tank is full.
wet|basah|adj|The floor is wet.
dry|kering|adj|Keep your hands dry.
strong|kuat|adj|The rope is strong.
loud|keras (suara)|adj|The alarm is loud.
careful|hati-hati|adj|Be careful!
correct|benar|adj|The answer is correct.
wrong|salah|adj|This number is wrong.
same|sama|adj|We work in the same team.
different|berbeda|adj|This tool is different.
next|berikutnya|adj|The next bus comes at nine.
last|terakhir; lalu|adj|This is the last box.
first|pertama|adj|This is my first day.
every|setiap|adj|I check the oil every day.
many|banyak|adj|There are many trucks.
all|semua|adj|All workers wear helmets.
count|menghitung|v|Count the boxes, please.
touch|menyentuh|v|Do not touch the pipe.
press|menekan|v|Press the button.
lift|mengangkat|v|Lift the box slowly.
move|memindahkan; bergerak|v|Move the car, please.
lock|mengunci|v|Lock the door.
enter|masuk|v|Do not enter this room.
leave|pergi; meninggalkan|v|I leave home at six.
try|mencoba|v|Try again.
follow|mengikuti|v|Follow me, please.
watch|mengawasi; menonton|v|Watch the gauge.
fix|memperbaiki|v|Can you fix the lamp?
change|mengganti|v|Change the battery.
fill|mengisi|v|Fill the tank with water.
cut|memotong|v|Cut the cable here.
build|membangun|v|They build a new road.
drive|menyetir|v|I drive a truck.
`);

addWords(2, `
#u
yesterday|kemarin|adv|I saw him yesterday.
tonight|malam ini|adv|I will call you tonight.
soon|segera|adv|The bus will come soon.
already|sudah|adv|I have already eaten.
still|masih|adv|He is still at work.
again|lagi|adv|Please try again.
often|sering|adv|I often walk to work.
sometimes|kadang-kadang|adv|I sometimes work at night.
together|bersama|adv|We eat lunch together.
alone|sendirian|adv|She lives alone.
maybe|mungkin|adv|Maybe it will rain.
almost|hampir|adv|I am almost ready.
enough|cukup|adj|We have enough time.
both|keduanya|adj|Both pumps are running.
other|lain|adj|Use the other door.
important|penting|adj|This meeting is important.
possible|mungkin (bisa)|adj|Is it possible to come earlier?
necessary|perlu|adj|A helmet is necessary here.
interesting|menarik|adj|The book is interesting.
boring|membosankan|adj|The film was boring.
angry|marah|adj|My boss was angry.
afraid|takut|adj|I am afraid of snakes.
worried|khawatir|adj|She is worried about the test.
proud|bangga|adj|I am proud of my team.
polite|sopan|adj|He is always polite.
friendly|ramah|adj|The new manager is friendly.
lazy|malas|adj|Do not be lazy.
clever|pintar|adj|She is a clever student.
healthy|sehat|adj|Vegetables are healthy.
hurt|sakit; melukai|v|My back hurts.|hurts
pain|rasa sakit|n|I have a pain in my leg.
medicine|obat|n|Take this medicine twice a day.
doctor|dokter|n|I must see a doctor.
hospital|rumah sakit|n|The hospital is near the port.
holiday|liburan|n|We had a holiday in Bali.
beach|pantai|n|The beach was clean.
mountain|gunung|n|We climbed a mountain.
river|sungai|n|The river is wide.
island|pulau|n|Tarakan is an island.
village|desa|n|My village is small.
country|negara|n|Indonesia is a big country.
language|bahasa|n|English is a useful language.
word|kata|n|What does this word mean?
question|pertanyaan|n|I have a question.
story|cerita|n|Tell me the story.
news|berita|n|I read the news online.
music|musik|n|I listen to music at night.
film|film|n|The film starts at eight.
game|permainan; pertandingan|n|We watched the game on TV.
sport|olahraga|n|Football is my favourite sport.
party|pesta|n|The party is on Saturday.
gift|hadiah|n|I bought a gift for my mother.
birthday|ulang tahun|n|Today is my birthday.
clothes|pakaian|n|I wash my clothes on Sunday.
shirt|kemeja|n|He wore a white shirt.
jacket|jaket|n|Bring a jacket.
umbrella|payung|n|Take an umbrella.
rain|hujan|n|The rain was heavy.
wind|angin|n|The wind is strong.
sun|matahari|n|The sun is hot.
season|musim|n|The rainy season starts in October.
price|harga|n|The price is too high.
market|pasar|n|I buy fish at the market.
restaurant|restoran|n|We ate at a small restaurant.
kitchen|dapur|n|The kitchen is clean.
bathroom|kamar mandi|n|The bathroom is on the left.
garden|kebun; taman|n|She has a small garden.
street|jalan (kota)|n|The street is busy.
bridge|jembatan|n|We crossed the bridge.
station|stasiun; terminal|n|The bus station is far.
map|peta|n|Look at the map.
passport|paspor|n|Do not forget your passport.
luggage|bagasi|n|My luggage is heavy.
hotel|hotel|n|The hotel is near the airport.
flight|penerbangan|n|My flight leaves at six.
trip|perjalanan|n|The trip took two hours.
arrive|tiba|v|We will arrive at noon.
return|kembali; mengembalikan|v|I will return on Monday.
stay|tinggal; menginap|v|We will stay for three days.
rest|beristirahat|v|You should rest.
relax|bersantai|v|I relax at the weekend.
swim|berenang|v|I can swim well.
climb|memanjat; mendaki|v|Do not climb the fence.
enjoy|menikmati|v|I enjoy my work.
hope|berharap|v|I hope you are well.
feel|merasa|v|I feel tired.
believe|percaya|v|I believe you.
understand|mengerti|v|I do not understand.
agree|setuju|v|I agree with you.
choose|memilih|v|Choose the correct answer.
spend|menghabiskan (uang, waktu)|v|I spend one hour on the bus.
save|menabung; menyimpan|v|I save money every month.
lend|meminjamkan|v|Can you lend me a pen?
send|mengirim|v|Please send me the file.
keep|menyimpan; menjaga|v|Keep the door closed.
lose|kehilangan|v|Do not lose the key.
find|menemukan|v|I cannot find my phone.
miss|ketinggalan; rindu|v|Do not miss the bus.
begin|mulai|v|The class will begin at nine.
plan|rencana|n|We have a new plan.
practice|berlatih|v|I practice English every day.
#k
task|tugas|n|This task is easy.
duty|tugas; dinas|n|I am on duty tonight.
staff|staf|n|The staff are in a meeting.
colleague|rekan kerja|n|My colleague helped me.
manager|manajer|n|The manager is in his office.
technician|teknisi|n|The technician fixed the fan.
operator|operator|n|The operator checked the panel.
guard|penjaga|n|The guard opened the gate.
contractor|kontraktor|n|The contractor arrived late.
customer|pelanggan|n|The customer is waiting.
form|formulir|n|Please fill in this form.
list|daftar|n|Check the list.
note|catatan|n|I wrote a note for you.
file|berkas|n|The file is on my desk.
document|dokumen|n|Please sign the document.
letter|surat|n|I got a letter from the bank.
email|surel|n|I sent you an email.
copy|salinan|n|I need a copy of the report.
signature|tanda tangan|n|We need your signature.
date|tanggal|n|What is the date today?
panel|panel|n|The panel shows an alarm.
screen|layar|n|Look at the screen.
filter|saringan|n|The filter is dirty.
belt|sabuk|n|The belt is loose.
bolt|baut|n|Tighten the bolt.
ladder|tangga (lipat)|n|Hold the ladder.
rope|tali|n|The rope is strong.
bucket|ember|n|Put a bucket under the leak.
hose|selang|n|Connect the hose.
torch|senter|n|Bring a torch.
battery|baterai|n|The battery is low.
fuel|bahan bakar|n|The truck needs fuel.
steam|uap|n|Steam is very hot.
dust|debu|n|There is dust on the floor.
vibration|getaran|n|The vibration is high.
speed|kecepatan|n|Reduce your speed.
weight|berat|n|Check the weight of the box.
size|ukuran|n|What size do you need?
high|tinggi|adj|The temperature is high.
low|rendah|adj|The oil level is low.
loose|longgar|adj|The cable is loose.
sharp|tajam|adj|The knife is sharp.
smooth|halus; lancar|adj|The test was smooth.
rough|kasar|adj|The surface is rough.
thick|tebal|adj|The wall is thick.
thin|tipis|adj|The plate is too thin.
clear|jelas; jernih|adj|The instruction is clear.
connect|menyambungkan|v|Connect the cable.
tighten|mengencangkan|v|Tighten the bolt.
weigh|menimbang|v|Weigh the bag.
test|menguji|v|We will test the pump.
record|mencatat|v|Record the temperature.
order|memesan|v|We must order a new filter.
deliver|mengantar|v|They will deliver the parts tomorrow.
collect|mengumpulkan; mengambil|v|Collect the tools after work.
store|menyimpan|v|Store the oil in a cool place.
cover|menutupi|v|Cover the tank.
remove|melepas|v|Remove the cover.
drain|menguras|v|Drain the water first.
shut|menutup|v|Shut the valve.
reach|mencapai|v|The level will reach the top.
drop|menjatuhkan; turun|v|Do not drop the tool.
rise|naik|v|The pressure will rise.
allow|mengizinkan|v|They allow visitors on Friday.
join|bergabung|v|Please join the meeting.
share|membagikan|v|Please share the file.
announce|mengumumkan|v|They will announce the result today.
`);
