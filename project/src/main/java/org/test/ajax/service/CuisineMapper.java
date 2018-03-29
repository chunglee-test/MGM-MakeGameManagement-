package org.test.ajax.service;

import java.util.ArrayList;

import org.test.ajax.vo.CHcuisine;

public interface CuisineMapper {

	//가져오기
	public CHcuisine select(int cscode);
	
	public ArrayList<CHcuisine> selectAll(int cscode);	
}
