import React from 'react'
import SectionHeader from '../componentHeader/SectionHeader'
import AboutUsBox from '../aboutUsBox/AboutUsBox'

import './AboutUs.css'
export default function AboutUs() {
  return (
    <div class="about-us">
    <div class="container">
      <SectionHeader
        title="ما چه کمکی بهتون میکنیم؟"
        desc="از اونجایی که آکادمی آموزشی سبزلرن یک آکادمی خصوصی هست"
      />

      <div class="container">
        <div class="row">
            <AboutUsBox title="دوره های اختصاصی" desc="با پشتیبانی و کیفیت بالا ارائه میده !"  icon={"solid fa-magnifying-glass" }/>
            <AboutUsBox title="دوره های اختصاصی" desc="با پشتیبانی و کیفیت بالا ارائه میده !" />
            <AboutUsBox title="دوره های اختصاصی" desc="با پشتیبانی و کیفیت بالا ارائه میده !" />
            <AboutUsBox title="دوره های اختصاصی" desc="با پشتیبانی و کیفیت بالا ارائه میده !" />
        </div>
      </div>
    </div>
  </div>
  )
}
