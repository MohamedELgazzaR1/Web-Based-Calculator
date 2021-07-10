	package com.example.demo;

	import org.springframework.context.annotation.ComponentScan;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
	import org.springframework.web.bind.annotation.RequestBody;
	import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;

import java.lang.Math;
@RestController
@RequestMapping(value="/Calc")
@CrossOrigin
public class CalcService {

	
		@GetMapping("/Areth")
		public String Aretmatic(@RequestParam String firstTerm ,@RequestParam String secondTerm ,@RequestParam String operation) {
			
			double first= Double.parseDouble(firstTerm);
			double second= Double.parseDouble(secondTerm);
			double result=0;
			boolean ErrorFlag = false;
			
				switch (operation) {
			  case "+":
					result=first+second;
					break;
				case "-":
					result=first-second;
					break;	
				case "÷":
					if(second==0) {
						ErrorFlag=true;
						}else {
							result=first/second;
						}
					break;
				default:
					result=first*second;
				}
				if(ErrorFlag)
					return "E";
			return String.valueOf(result);
							
		}
		
		@GetMapping("/Uni")
		public String Uniterm(@RequestParam String term,@RequestParam String operation) {
			
			double number= Double.parseDouble(term);
			double result=0;
			boolean ErrorFlag = false;
			switch (operation) {
			  case "+/-":
					result=number*-1;
					break;
				case "1/x":
					if(number==0) {
						ErrorFlag=true;
						}else {
							result=1/number;
						}
					break;
				case "√x":
					if(number<0) {
						ErrorFlag=true;
						}else {	
						result=	Math.sqrt(number);
						}
					break;
				case "%":
					result=number/100;
					break;
				default:
					result=number*number;
				}
				if(ErrorFlag)
					return "E";
			return String.valueOf(result);
				
		}
		

		
		
		
	}

	
	

