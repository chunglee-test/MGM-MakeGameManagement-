package net.mgm.www.mapper;

import java.util.ArrayList;

import javax.inject.Inject;
import org.apache.ibatis.session.SqlSession;
import org.springframework.stereotype.Repository;

import net.mgm.www.vo.maptest;

@Repository
public class MapDAO {
	
	@Inject
	private SqlSession session;
	
	public ArrayList<maptest> maplist() {
		return session.getMapper(MapMapper.class).maplist();
		
	}
}
