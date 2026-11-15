import pathlib
src = pathlib.Path(__file__).parent / "src"
tpl = (src / "index.html").read_text(encoding="utf8")
css = (src / "style.css").read_text(encoding="utf8")
data = "\n".join((src / n).read_text(encoding="utf8") for n in ["data1.js", "data2.js", "data3.js", "data4.js", "data5.js", "data6.js", "data7.js", "data8.js", "data9.js", "data10.js", "data11.js", "data12.js", "data13.js", "data14.js", "data15.js", "data16.js", "data17.js", "scenes.js", "scenes2.js", "scenes3.js"])
app = (src / "app.js").read_text(encoding="utf8")
out = tpl.replace("/*CSS*/", css).replace("/*DATA*/", data).replace("/*APP*/", app)
assert "</script>" not in data and "</script>" not in app
(pathlib.Path(__file__).parent / "index.html").write_text(out, encoding="utf8")
print(len(out) // 1024, "KB")
