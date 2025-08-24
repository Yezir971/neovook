import { Component } from '@angular/core';
import { CallToAction } from '../../features/home/components/call-to-action/call-to-action';
import { FeaturesSection } from '../../features/home/components/features-section/features-section';
import { HeroSection } from '../../features/home/components/hero-section/hero-section';


@Component({
  selector: 'neo-home',
  imports: [CallToAction, FeaturesSection, HeroSection],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home {

}
