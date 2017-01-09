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
            return this.create
                ? !url.trim() || url.indexOf('?') != -1 || url.indexOf('#') != -1
                : (
                    url.trim() ? url.indexOf('?') != -1 || url.indexOf('#') != -1 : false
                  );
        }
    },
    methods: {
        saveRule: function(){

            var store = window.localStorage;
            var rulesID = ++store.rulesID;
            var self = this;
            var msg = '';
            var rules;

            rules = JSON.parse( store.getItem('rules') );

            if( this.create ){

                rules.unshift({
                    id: rulesID,
                    url: this.url,
                    jscode: this.jscode
                });

                this.fnReset();

                msg = '创建成功！';

            }else{

                var index = rules.findIndex(function(r){
                    return r.id == self.ruleData.id;
                });

                if( this.url.trim() ){
                    rules.splice(index, 1, {
                        id: this.ruleData.id,
                        url: this.url,
                        jscode: this.jscode
                    });
                    msg = '保存成功！';
                }else {
                    rules.splice(index, 1);
                    msg = '删除成功！';
                }

                this.pristine = true;
            }

            store.setItem('rules', JSON.stringify(rules));

            App.$emit('update-rules', {msg: msg});
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

var Noty = {
    name: 'noty',
    template: '<transition name="noty"><div class="noty alert-success" v-show="show_status">{{msg}}</div></transition>',
    data: function(){
        return {
            show_status: false,
            msg: '',
        }
    },
    props: ['timeout'],
    methods: {
        show: function(msg){
            var self = this;
            this.show_status = true;
            this.msg = msg;
            setTimeout(function(){
                self.show_status = false;
            }, this.timeout || 0);
        }
    }
};

localStorage.rules = localStorage.rules || '[]';
localStorage.rulesID = localStorage.rulesID || 0;

var App = new Vue({
    el: '#app',
    components: {
        rule: Rule,
        noty: Noty
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
    },
}).$on('hide-create-rule-form', function(){
    this.showCreateRuleForm = false;
}).$on('update-rules', function(data){
    this.rules = JSON.parse(localStorage.rules);
    this.$refs.noty.show(data.msg);
})
