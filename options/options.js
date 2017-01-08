var Rule = {
    name: 'rule',
    template: '#ruleTpl',
    props: ['create', 'ruleData'],
    data: function(){
        return {
            url: this.ruleData && this.ruleData.url || '',
            jscode: this.ruleData && this.ruleData.jscode || '',
            pristine: true,
        }
    },
    computed: {
        error: function(){
            var url = this.url;
            return !url.trim() || url.indexOf('?') != -1 || url.indexOf('#') != -1;
        }
    },
    methods: {
        saveRule: function(){

            var store = window.localStorage;
            var rulesID = ++store.rulesID;
            var self = this;
            var rules;

            rules = JSON.parse( store.getItem('rules') );

            if( this.create ){

                rules.unshift({
                    id: rulesID,
                    url: this.url,
                    jscode: this.jscode
                });

                this.fnReset();

            }else{

                var index = rules.findIndex(function(r){
                    return r.id == self.ruleData.id;
                });
                rules.splice(index, 1, {
                    id: this.ruleData.id,
                    url: this.url,
                    jscode: this.jscode
                })

                this.pristine = true;
            }

            store.setItem('rules', JSON.stringify(rules));

            App.$emit('update-rules');

            alert('操作成功~');
        },
        fnAltered: function(){
            this.pristine = false;
        },
        fnReset: function(){
            this.url = this.ruleData && this.ruleData.url || '';
            this.jscode = this.ruleData && this.ruleData.jscode || '';
            this.pristine = true;
            this.create && App.$emit('hide-create-rule-form');
        },
    }
};

localStorage.rules = localStorage.rules || '[]';
localStorage.rulesID = localStorage.rulesID || 0;

var App = new Vue({
    el: '#app',
    components: {
        rule: Rule
    },
    data: {
        rules: window.localStorage.rules ? JSON.parse(window.localStorage.rules) : [],
        showCreateRuleBtn: false,
        showCreateRuleForm: false,
    },
    computed: {
        empty: function(){
            return !this.rules.some(function(r){
                return r;
            });
        }
    },
    methods: {
        updateRule: function(key, value){
            Vue.set(App.rules, key, value);
        },
        fnShowCreateRuleForm: function(){
            this.showCreateRuleForm = true;
        }
    }
}).$on('hide-create-rule-form', function(){
    this.showCreateRuleForm = false;
}).$on('update-rules', function(){
    this.rules = JSON.parse(localStorage.rules);
})
