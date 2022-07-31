import React, { useState } from 'react'
import { Modal } from 'react-bootstrap';
import ImageUploadBox from '../host/myBoard/component/ImageUploadBox';
import HostAddress from './HostAddress';
import axios from 'axios';



const MemChange = () => {

  // MEM_IDX 불러오는 기능있어야함

  const [insertModal, setInsertModal] = React.useState(false);
  const [showAddrModal, setShowAddrModal] = React.useState(false);
  const [insertFiles, setInsertFiles] = useState([]);
  const [insertHost, setInsertHost] = useState({    
    MEM_IDX : '8',
    HOST_EMAIL : '',
    HOST_POST : '',
    HOST_ADDR1 : '',
    HOST_ADDR2 : '',
    HOST_JUMIN1 : '',
		HOST_JUMIN2 : '',
		HOST_INTRO : '',
		HOST_ACCOUNT : '',
		HOST_BANK : ''
  });  

  const {     
    MEM_IDX,
    HOST_EMAIL,
    HOST_POST,
    HOST_ADDR1,
    HOST_ADDR2,
    HOST_JUMIN1,
    HOST_JUMIN2,
    HOST_INTRO,
    HOST_ACCOUNT,
    HOST_BANK } = insertHost;

    const setAddrInfo = (data) => {
      setInsertHost({
        ...insertHost,
        'HOST_ADDR1': data.HOST_ADDR1,
        'HOST_POST': data.HOST_POST
      })
      setShowAddrModal(false)
      console.log(insertHost)
    }

  const onChange = (e) => {    
    const { value, name } = e.target;  
    setInsertHost({      
      ...insertHost, // 기존의 input 객체를 복사한 뒤      
      [name]: value // name 키를 가진 값을 value 로 설정    
    });  
   
  };
  console.log(insertHost)
  // const getImages = (image) => {
  //   setInsertHostFiles(image)
  // }
  //  // 미리보기로 만들어진 이미지를 저장 

  const memChange = () => {
          if(HOST_EMAIL!==""){
            if(HOST_POST!==""){
              if(HOST_ADDR1!==""){
                if(HOST_ADDR2!==""){
                  if(HOST_JUMIN1!==""){
                    if(HOST_JUMIN2!==""){
                      if(HOST_INTRO!==""){
                        if(HOST_ACCOUNT!==""){
                          if(HOST_BANK!==""){
              axios({
                method : 'post' ,
                url : '/GareBnB/mypage/memChange.do' ,
                contentType:"application/json;charset=UTF-8",
                params : insertHost
                }).then(Response => {
                  alert("성공")
                  // 메인으로 나가든가 어디로든 나가든가 
                }).catch(err => {
                  console.log(err);
                });
                    }
                    else alert("은행명을 입력해주세요")
                  }
                  else alert("계좌번호를 입력해주세요")
                }
                else alert("소개글을 입력해주세요")
              }
              else alert("주민등록번호 뒷자리(1자리)를 입력해주세요")
            }
            else alert("주민등록번호 앞자리를 입력해주세요")
          }
          else alert("상세 주소를 입력해주세요")
        }
        else alert("기본 주소를 입력해주세요")
      }
      else alert("우편번호를 입력해주세요")
    }
    else alert("이메일을 입력해주세요")
  }

  const HostLevUpdate=() => { // 호스트 전환 요청시 레벨 2 -> 3으로 업데이트
  axios({
    method : 'post' ,
    url : '/GareBnB/mypage/updateHostMem.do' ,
    contentType:"application/json;charset=UTF-8",
    params : {
      MEM_IDX : insertHost.MEM_IDX
    }}).then(Response => {
      alert("성공")
      // 메인으로 나가든가 어디로든 나가든가 
    }).catch(err => {
      console.log(err);
    });
        }
      

  return (
    <div>
     <h3>이메일주소 : </h3>
      <input name="HOST_EMAIL" placeholder="이메일 입력" onChange={onChange} value={HOST_EMAIL} />
      <br/>
      <h3>우편번호 : </h3>
      <input name="HOST_POST" placeholder="우편번호 입력" onChange={onChange} value={HOST_POST} />
      <button
      className="btn btn-outline-secondary"
      type="button"
      id="button-addon"
      onClick={() => setShowAddrModal(true)}>
      우편번호 찾기
      </button>
      <h3>기본주소 : </h3>
      <input name="HOST_ADDR1" placeholder="기본 주소 입력" onChange={onChange} value={HOST_ADDR1} />
      <br/>
      <h3>상세주소 : </h3>
      <input name="HOST_ADDR2" placeholder="상세 주소 입력" onChange={onChange} value={HOST_ADDR2} />
      <br/>
      <h3>주민 등록 번호 : </h3>
      <input name="HOST_JUMIN1" placeholder="주민 등록 번호 앞자리" onChange={onChange} value={HOST_JUMIN1} /> -  
      <input name="HOST_JUMIN2" placeholder="주민 등록 번호 뒷자리 1번째" onChange={onChange} value={HOST_JUMIN2} /> ******
      <br/>
      <h3>본인 소개 : </h3>
      <input name="HOST_INTRO" placeholder="본인 소개" onChange={onChange} value={HOST_INTRO} />
      <br/>
      <h3>은행 : </h3>
      {/* 은행명 선택할 수 있게 수정하기 */}
      <input name="HOST_BANK" placeholder="은행명" onChange={onChange} value={HOST_BANK} />
      <br/>
      <h3>계좌번호 : </h3>
      <input name="HOST_ACCOUNT" placeholder="계좌번호 입력" onChange={onChange} value={HOST_ACCOUNT} />
      <br/>

        {/* 입력확인창 모달로 띄우기 !  */}
        <Modal
          show={showAddrModal}
          onHide={() => setShowAddrModal(false)}
        >
          <HostAddress
            setAddrInfo={setAddrInfo}
          />
        </Modal>
        {/* 주소 검색 모달 */}

      {/* 사진 첨부 */}


      <button onClick={ () => { // 버튼 클릭하면 호스트 DB에 저장 & 멤버 DB에 레벨 3으로 업데이트 
        memChange()
        HostLevUpdate()
      }}>등록하기</button>
    
    </div>
    
  )
}

export default MemChange

