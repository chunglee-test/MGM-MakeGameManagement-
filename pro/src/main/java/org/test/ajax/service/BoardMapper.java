package org.test.ajax.service;

import java.util.ArrayList;

import org.apache.ibatis.session.RowBounds;
import org.test.ajax.vo.CHboard;
import org.test.ajax.vo.CHreply;

public interface BoardMapper {
	//게시글 저장
	public int insertBoard(CHboard board);
	//글번호로 해당 게시글 검색
	public CHboard getBoard(int boardnum);
	//조회수 1 증가
	public int addHits(int boardnum);
	//검색 후의 총 글 개수
	public int getTotal(String searchText);
	//검색 후의 현재 페이지 목록
	public ArrayList<CHboard> listBoard(String searchText, RowBounds rb);
	//글번호와 아이디로 해당 게시글 삭제
	public int deleteBoard(CHboard board);
	//글 수정
	public int updateBoard(CHboard board);
	//리플 저장
	public int insertReply(CHreply reply);
	//리플목록
	public ArrayList<CHreply> listReply(int boardnum);
	//리플 삭제
	public int deleteReply(CHreply reply);
	//리플 수정
	public int updateReply(CHreply reply);
	
	
}
