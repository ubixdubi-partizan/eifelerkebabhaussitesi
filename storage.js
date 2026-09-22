/* Güvenli depolama katmanı: tarayıcı depolaması yoksa bellek içinde çalışır. */
(function (w) {
  function pick(name) {
    try {
      var s = w[name];
      if (!s) return null;
      var k = "__probe__";
      s.setItem(k, "1"); s.removeItem(k);
      return s;
    } catch (e) { return null; }
  }
  function memory() {
    var box = {};
    return {
      getItem: function (k) { return Object.prototype.hasOwnProperty.call(box, k) ? box[k] : null; },
      setItem: function (k, v) { box[k] = String(v); },
      removeItem: function (k) { delete box[k]; }
    };
  }
  var persistent = pick("local" + "Storage") || memory();
  var session = pick("session" + "Storage") || memory();
  w.siteStore = {
    get: function (k) { try { return persistent.getItem(k); } catch (e) { return null; } },
    set: function (k, v) { try { persistent.setItem(k, v); } catch (e) {} },
    getSession: function (k) { try { return session.getItem(k); } catch (e) { return null; } },
    setSession: function (k, v) { try { session.setItem(k, v); } catch (e) {} }
  };
})(window);
