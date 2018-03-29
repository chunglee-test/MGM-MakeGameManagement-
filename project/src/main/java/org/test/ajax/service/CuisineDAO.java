package org.test.ajax.service;

import java.util.ArrayList;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.test.ajax.vo.CHcuisine;

@Repository
public class CuisineDAO {

	@Autowired
	SqlSession sqlsession;
	public CHcuisine select(int cscode){
		
		CuisineMapper mapper = sqlsession.getMapper(CuisineMapper.class);
		CHcuisine c = mapper.select(cscode);
		
		return c;
	}
	 
	public ArrayList<CHcuisine> selectAll(int cscode){
		
		CuisineMapper mapper = sqlsession.getMapper(CuisineMapper.class);
		ArrayList<CHcuisine> list = mapper.selectAll(cscode);
		
		return list;
	}
	
}
