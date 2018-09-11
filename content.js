
let DSHExt = {
    _host: 'http://127.0.0.1:8080',
    axios: axios,
    get: async function(url, args) {return await axios.get(this._host + url, args);},
    post: async function(url, args) {return await axios.post(this._host + url, args);},
    run: async function(url, args) {
        let _r = await this.get(url, args);
        eval(_r.data);
    },
};

(async () => {
    let _r = await DSHExt.get('/static/inject-list.json');
    for (let _s of _r.data.scripts) {
        if (location.host.match(_s.match)) {
            await DSHExt.run(_s.src);
        }
    }
})();


