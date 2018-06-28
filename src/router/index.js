import Vue from 'vue'
import Router from 'vue-router'
import home from '@/pages/home/home'
import search from '@/pages/search/search'
import detail from '@/pages/detail/detail'
import comment from '@/pages/comment/comment'
import review from '@/pages/review/review'
import reviewDetail from '@/pages/review/components/detail'
import detailContain from '@/pages/detail/detail-container'
import user from '@/pages/user/user'
import celebrity from '@/pages/celebrity/celebrity'
import allworks from '@/pages/celebrity/allWorks'
import rank from '@/pages/rank/rank'
import rankDetail from '@/pages/rank/rank-detail'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/movie-show'
    }, {
      path: '/movie-show',
      name: 'home',
      component: home
    }, {
      path: '/search',
      name: 'search',
      component: search
    }, {
      path: '/detail/:id',
      component: detailContain,
      children: [{
        path: '',
        name: 'detail',
        component: detail
      }, {
        path: 'review',
        name: 'review',
        component: review
      }, {
        path: 'review/:reviewID',
        name: 'reviewDetail',
        component: reviewDetail
      }]
    }, {
      path: '/detail/:id/comment',
      name: 'comment',
      component: comment
    }, {
      path: '/user',
      component: user
    }, {
      path: '/celebrity/:celebrityID',
      name: 'celebrity',
      component: celebrity
    }, {
      path: '/celebrity/:celebrityID/works',
      name: 'allworks',
      component: allworks
    }, {
      path: '/rank',
      name: 'rank',
      component: rank
    }, {
      path: '/rank/:rankType',
      name: 'rankDetail',
      component: rankDetail
    }
  ],
  mode: 'history'
})
